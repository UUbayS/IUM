const prisma = require('../config/prisma');
const generateRegistrationNumber = require('../utils/generateRegistrationNumber');
const generateAccessCode = require('../utils/generateAccessCode');
const deleteUploadedFiles = require('../utils/deleteUploadedFiles');
const { sanitizeObject } = require('../utils/sanitize');

const requiredDocumentTypes = [
  'kartu_keluarga',
  'kartu_nisn',
  'akta_kelahiran',
  'ktp_orang_tua',
  'transkrip_nilai',
  'ijazah',
];

const documentTypeMap = {
  kartu_keluarga: 'KARTU_KELUARGA',
  kartu_nisn: 'KARTU_NISN',
  akta_kelahiran: 'AKTA_KELAHIRAN',
  ktp_orang_tua: 'KTP_ORANG_TUA',
  transkrip_nilai: 'TRANSKRIP_NILAI',
  ijazah: 'IJAZAH',
  skl_mutasi: 'SKL_MUTASI',
};

function mapGender(gender) {
  if (gender === 'Laki-laki' || gender === 'LAKI_LAKI') return 'LAKI_LAKI';
  if (gender === 'Perempuan' || gender === 'PEREMPUAN') return 'PEREMPUAN';
  return null;
}

function mapAcademicLevel(level) {
  if (!level) return null;

  const value = String(level).toUpperCase();

  if (value === 'MTS') return 'MTS';
  if (value === 'MA') return 'MA';
  if (value === 'SMP') return 'SMP';
  if (value === 'SMA') return 'SMA';

  return null;
}

async function submitRegistration(req, res) {
  try {
    const sanitized = sanitizeObject(req.body, [
      'full_name',
      'birth_place',
      'previous_school',
      'father_name',
      'father_job',
      'father_birth_place',
      'mother_name',
      'mother_job',
      'mother_birth_place',
    ]);

    const {
      registration_level,
      full_name,
      birth_place,
      birth_date,
      gender,
      child_order,
      nisn,
      academic_level,
      entry_class,
      previous_school,
      father_name,
      father_job,
      father_birth_place,
      father_birth_date,
      father_phone,
      mother_name,
      mother_job,
      mother_birth_place,
      mother_birth_date,
      mother_phone,
      sender_account_name,
      transfer_date,
    } = sanitized;

    if (!registration_level || !['SMP', 'SMA'].includes(registration_level)) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: 'Jenjang pendaftaran tidak valid',
      });
    }

    if (!full_name || !birth_place || !birth_date || !gender || !child_order || !nisn || !entry_class || !previous_school) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: 'Data santri belum lengkap',
      });
    }

    if (!father_name || !father_job || !father_birth_place || !father_birth_date || !father_phone || !mother_name || !mother_job || !mother_birth_place || !mother_birth_date || !mother_phone) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: 'Data orang tua belum lengkap',
      });
    }

    if (!sender_account_name || !transfer_date) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: 'Data pembayaran belum lengkap',
      });
    }

    const mappedGender = mapGender(gender);

    if (!mappedGender) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: 'Jenis kelamin tidak valid',
      });
    }

    for (const docType of requiredDocumentTypes) {
      if (!req.files?.[docType]?.[0]) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({
          success: false,
          message: `Dokumen ${docType} wajib diunggah`,
        });
      }
    }

    if (!req.files?.payment_proof?.[0]) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: 'Bukti transfer wajib diunggah',
      });
    }

    const registrationNumber = await generateRegistrationNumber();
    const accessCode = generateAccessCode();

    const documentsData = [];

    for (const docType of requiredDocumentTypes) {
      const file = req.files[docType][0];

      documentsData.push({
        documentType: documentTypeMap[docType],
        filePath: file.path,
        fileOriginalName: file.originalname,
        fileSize: file.size,
        fileMimeType: file.mimetype,
        isRequired: true,
      });
    }

    if (req.files?.skl_mutasi?.[0]) {
      const file = req.files.skl_mutasi[0];

      documentsData.push({
        documentType: 'SKL_MUTASI',
        filePath: file.path,
        fileOriginalName: file.originalname,
        fileSize: file.size,
        fileMimeType: file.mimetype,
        isRequired: false,
      });
    }

    const paymentProof = req.files.payment_proof[0];

    const registration = await prisma.registration.create({
      data: {
        registrationNumber,
        accessCode,
        registrationLevel: registration_level,
        status: 'MENUNGGU_VERIFIKASI',
        student: {
          create: {
            fullName: full_name,
            birthPlace: birth_place,
            birthDate: new Date(birth_date),
            gender: mappedGender,
            childOrder: Number(child_order),
            nisn,
            academicLevel: mapAcademicLevel(academic_level),
            entryClass: entry_class,
            previousSchool: previous_school,
          },
        },
        parent: {
          create: {
            fatherName: father_name,
            fatherJob: father_job,
            fatherBirthPlace: father_birth_place,
            fatherBirthDate: new Date(father_birth_date),
            fatherPhone: father_phone,
            motherName: mother_name,
            motherJob: mother_job,
            motherBirthPlace: mother_birth_place,
            motherBirthDate: new Date(mother_birth_date),
            motherPhone: mother_phone,
          },
        },
        documents: {
          create: documentsData,
        },
        payment: {
          create: {
            senderAccountName: sender_account_name,
            transferDate: new Date(transfer_date),
            paymentProofPath: paymentProof.path,
            paymentStatus: 'MENUNGGU_VERIFIKASI',
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil dikirim',
      data: {
        id: registration.id,
        registration_number: registrationNumber,
        access_code: accessCode,
        status: 'MENUNGGU_VERIFIKASI',
      },
    });
  } catch (error) {
    deleteUploadedFiles(req.files);

    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menyimpan pendaftaran',
    });
  }
}

async function checkStatus(req, res) {
  try {
    const { registration_number, access_code } = req.query;

    if (!registration_number || !access_code) {
      return res.status(400).json({
        success: false,
        message: 'Nomor pendaftaran dan kode akses wajib diisi',
      });
    }

    const registration = await prisma.registration.findFirst({
      where: {
        registrationNumber: registration_number,
        accessCode: access_code,
      },
      include: {
        student: true,
        payment: true,
      },
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Data pendaftaran tidak ditemukan',
      });
    }

    return res.json({
      success: true,
      message: 'Status pendaftaran berhasil diambil',
      data: {
        registration_number: registration.registrationNumber,
        student_name: registration.student?.fullName,
        registration_level: registration.registrationLevel,
        status: registration.status,
        payment_status: registration.payment?.paymentStatus,
        submitted_at: registration.submittedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}

module.exports = {
  submitRegistration,
  checkStatus,
};
