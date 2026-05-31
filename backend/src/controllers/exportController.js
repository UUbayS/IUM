const ExcelJS = require('exceljs');
const prisma = require('../config/prisma');
const { logError } = require('../utils/logger');

async function exportRegistrations(req, res) {
  try {
    const { status, level, start_date, end_date } = req.query;

    const where = {
      ...(status ? { status } : {}),
      ...(level ? { registrationLevel: level } : {}),
      ...(start_date || end_date
        ? {
            createdAt: {
              ...(start_date ? { gte: new Date(start_date) } : {}),
              ...(end_date ? { lte: new Date(end_date) } : {}),
            },
          }
        : {}),
    };

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        student: true,
        parent: true,
        payment: true,
        documents: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Pendaftar');

    worksheet.columns = [
      { header: 'No', key: 'no', width: 5 },
      { header: 'Nomor Pendaftaran', key: 'registrationNumber', width: 25 },
      { header: 'Jenjang Daftar', key: 'registrationLevel', width: 15 },
      { header: 'Status Pendaftaran', key: 'status', width: 25 },
      { header: 'Nama Santri', key: 'studentName', width: 30 },
      { header: 'Tempat Lahir Santri', key: 'birthPlace', width: 25 },
      { header: 'Tanggal Lahir Santri', key: 'birthDate', width: 20 },
      { header: 'Jenis Kelamin', key: 'gender', width: 18 },
      { header: 'Anak Ke', key: 'childOrder', width: 10 },
      { header: 'NISN', key: 'nisn', width: 20 },
      { header: 'Data Akademik', key: 'academicLevel', width: 20 },
      { header: 'Masuk Kelas', key: 'entryClass', width: 20 },
      { header: 'Sekolah Asal', key: 'previousSchool', width: 30 },
      { header: 'Nama Ayah', key: 'fatherName', width: 30 },
      { header: 'Pekerjaan Ayah', key: 'fatherJob', width: 25 },
      { header: 'Tempat Lahir Ayah', key: 'fatherBirthPlace', width: 25 },
      { header: 'Tanggal Lahir Ayah', key: 'fatherBirthDate', width: 20 },
      { header: 'No Telepon Ayah', key: 'fatherPhone', width: 20 },
      { header: 'Nama Ibu', key: 'motherName', width: 30 },
      { header: 'Pekerjaan Ibu', key: 'motherJob', width: 25 },
      { header: 'Tempat Lahir Ibu', key: 'motherBirthPlace', width: 25 },
      { header: 'Tanggal Lahir Ibu', key: 'motherBirthDate', width: 20 },
      { header: 'No Telepon Ibu', key: 'motherPhone', width: 20 },
      { header: 'Nama Rekening Pengirim', key: 'senderAccountName', width: 30 },
      { header: 'Tanggal Transfer', key: 'transferDate', width: 20 },
      { header: 'Status Pembayaran', key: 'paymentStatus', width: 25 },
      { header: 'Tanggal Daftar', key: 'submittedAt', width: 25 },
      { header: 'Catatan Admin', key: 'adminNote', width: 40 },
    ];

    registrations.forEach((item, index) => {
      worksheet.addRow({
        no: index + 1,
        registrationNumber: item.registrationNumber,
        registrationLevel: item.registrationLevel,
        status: item.status,
        studentName: item.student?.fullName,
        birthPlace: item.student?.birthPlace,
        birthDate: item.student?.birthDate,
        gender: item.student?.gender,
        childOrder: item.student?.childOrder,
        nisn: item.student?.nisn,
        academicLevel: item.student?.academicLevel,
        entryClass: item.student?.entryClass,
        previousSchool: item.student?.previousSchool,
        fatherName: item.parent?.fatherName,
        fatherJob: item.parent?.fatherJob,
        fatherBirthPlace: item.parent?.fatherBirthPlace,
        fatherBirthDate: item.parent?.fatherBirthDate,
        fatherPhone: item.parent?.fatherPhone,
        motherName: item.parent?.motherName,
        motherJob: item.parent?.motherJob,
        motherBirthPlace: item.parent?.motherBirthPlace,
        motherBirthDate: item.parent?.motherBirthDate,
        motherPhone: item.parent?.motherPhone,
        senderAccountName: item.payment?.senderAccountName,
        transferDate: item.payment?.transferDate,
        paymentStatus: item.payment?.paymentStatus,
        submittedAt: item.submittedAt,
        adminNote: item.adminNote,
      });
    });

    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=data-pendaftar-psb.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    logError(error, 'exportRegistrations');
    return res.status(500).json({
      success: false,
      message: 'Gagal mengekspor data pendaftar',
    });
  }
}

module.exports = { exportRegistrations };
