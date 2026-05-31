const prisma = require('../config/prisma');
const path = require('path');
const fs = require('fs');
const { isPathSafe } = require('../utils/validateFilePath');

async function verifyDocument(req, res) {
  try {
    const { id } = req.params;
    const { verification_status, admin_note } = req.body;

    const allowedStatus = [
      'BELUM_DICEK',
      'VALID',
      'TIDAK_VALID',
      'PERLU_REVISI',
    ];

    if (!allowedStatus.includes(verification_status)) {
      return res.status(400).json({
        success: false,
        message: 'Status dokumen tidak valid',
      });
    }

    const document = await prisma.document.update({
      where: { id },
      data: {
        verificationStatus: verification_status,
        adminNote: admin_note || null,
      },
    });

    return res.json({
      success: true,
      message: 'Status dokumen berhasil diperbarui',
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}

async function downloadDocument(req, res) {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Dokumen tidak ditemukan',
      });
    }

    if (!isPathSafe(document.filePath)) {
      return res.status(403).json({
        success: false,
        message: 'Akses ditolak',
      });
    }

    const filePath = path.resolve(document.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File dokumen tidak ditemukan',
      });
    }

    res.setHeader('Content-Type', document.fileMimeType);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${document.fileOriginalName}"`
    );

    return res.sendFile(filePath);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}

module.exports = { verifyDocument, downloadDocument };
