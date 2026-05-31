const fs = require('fs');

function deleteUploadedFiles(files) {
  if (!files) return;

  Object.values(files).forEach((fileArray) => {
    fileArray.forEach((file) => {
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  });
}

module.exports = deleteUploadedFiles;
