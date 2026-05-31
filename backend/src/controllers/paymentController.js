const prisma = require('../config/prisma');

async function verifyPayment(req, res) {
  try {
    const { id } = req.params;
    const { payment_status, admin_note } = req.body;

    const allowedStatus = [
      'MENUNGGU_VERIFIKASI',
      'VALID',
      'TIDAK_VALID',
    ];

    if (!allowedStatus.includes(payment_status)) {
      return res.status(400).json({
        success: false,
        message: 'Status pembayaran tidak valid',
      });
    }

    const payment = await prisma.payment.update({
      where: { id },
      data: {
        paymentStatus: payment_status,
        adminNote: admin_note || null,
        verifiedById: req.admin.id,
        verifiedAt: new Date(),
      },
    });

    return res.json({
      success: true,
      message: 'Status pembayaran berhasil diperbarui',
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}

module.exports = { verifyPayment };
