function errorMiddleware(error, req, res, next) {
  if (error.message === 'Format file tidak didukung') {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Ukuran file terlalu besar',
    });
  }

  if (error.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Data tidak ditemukan',
    });
  }

  if (error.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'Data sudah ada (duplikat)',
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan server',
  });
}

module.exports = errorMiddleware;
