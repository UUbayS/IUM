const path = require('path');

const UPLOAD_DIRS = [
  path.resolve(process.env.UPLOAD_DOCUMENT_PATH || 'uploads/documents'),
  path.resolve(process.env.UPLOAD_PAYMENT_PATH || 'uploads/payments'),
];

function isPathSafe(filePath) {
  const resolved = path.resolve(filePath);
  return UPLOAD_DIRS.some((dir) => resolved.startsWith(dir + path.sep) || resolved === dir);
}

module.exports = { isPathSafe, UPLOAD_DIRS };
