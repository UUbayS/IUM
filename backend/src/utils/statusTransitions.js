const validTransitions = {
  MENUNGGU_VERIFIKASI: ['BERKAS_KURANG', 'MENUNGGU_PEMBAYARAN', 'DITOLAK'],
  BERKAS_KURANG: ['MENUNGGU_VERIFIKASI', 'DITOLAK'],
  MENUNGGU_PEMBAYARAN: ['PEMBAYARAN_TERVERIFIKASI', 'DITOLAK'],
  PEMBAYARAN_TERVERIFIKASI: ['DITERIMA', 'DITOLAK'],
  DITERIMA: [],
  DITOLAK: ['MENUNGGU_VERIFIKASI'],
};

function isValidTransition(currentStatus, newStatus) {
  return validTransitions[currentStatus]?.includes(newStatus) ?? false;
}

module.exports = { validTransitions, isValidTransition };
