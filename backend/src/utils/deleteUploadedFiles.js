const fs = require('fs').promises;

async function deleteUploadedFiles(files) {
  if (!files) return;

  const deletePromises = [];

  Object.values(files).forEach((fileArray) => {
    fileArray.forEach((file) => {
      if (file.path) {
        deletePromises.push(
          fs.unlink(file.path).catch(() => {})
        );
      }
    });
  });

  await Promise.all(deletePromises);
}

module.exports = deleteUploadedFiles;
