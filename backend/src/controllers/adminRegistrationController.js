const prisma = require('../config/prisma');
const { logError } = require('../utils/logger');
const { isValidTransition } = require('../utils/statusTransitions');

async function getAllRegistrations(req, res) {
  try {
    const { status, level, keyword, page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const where = {
      ...(status ? { status } : {}),
      ...(level ? { registrationLevel: level } : {}),
      ...(keyword
        ? {
            student: {
              fullName: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          }
        : {}),
    };

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        include: {
          student: true,
          payment: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limitNum,
      }),
      prisma.registration.count({ where }),
    ]);

    return res.json({
      success: true,
      message: 'Data pendaftar berhasil diambil',
      data: registrations,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    logError(error, 'getAllRegistrations');
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}

async function getRegistrationDetail(req, res) {
  try {
    const { id } = req.params;

    const registration = await prisma.registration.findUnique({
      where: { id },
      include: {
        student: true,
        parent: true,
        documents: true,
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
      message: 'Detail pendaftaran berhasil diambil',
      data: registration,
    });
  } catch (error) {
    logError(error, 'getRegistrationDetail');
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}

async function updateRegistrationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, admin_note } = req.body;

    const allowedStatus = [
      'MENUNGGU_VERIFIKASI',
      'BERKAS_KURANG',
      'MENUNGGU_PEMBAYARAN',
      'PEMBAYARAN_TERVERIFIKASI',
      'DITERIMA',
      'DITOLAK',
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status pendaftaran tidak valid',
      });
    }

    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Data pendaftaran tidak ditemukan',
      });
    }

    if (!isValidTransition(registration.status, status)) {
      return res.status(400).json({
        success: false,
        message: `Transisi dari ${registration.status} ke ${status} tidak diizinkan`,
      });
    }

    const updated = await prisma.registration.update({
      where: { id },
      data: {
        status,
        adminNote: admin_note || null,
      },
    });

    return res.json({
      success: true,
      message: 'Status pendaftaran berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    logError(error, 'updateRegistrationStatus');
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}

module.exports = {
  getAllRegistrations,
  getRegistrationDetail,
  updateRegistrationStatus,
};
