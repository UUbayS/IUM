const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const { isTokenBlacklisted } = require('../utils/tokenBlacklist');

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan',
      });
    }

    const token = authHeader.split(' ')[1];

    if (isTokenBlacklisted(token)) {
      return res.status(401).json({
        success: false,
        message: 'Token sudah tidak berlaku',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin tidak valid',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid',
    });
  }
}

module.exports = authMiddleware;
