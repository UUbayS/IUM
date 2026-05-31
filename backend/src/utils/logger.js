function logError(error, context = '') {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR ${context}:`, error.message);
  if (process.env.APP_ENV === 'development') {
    console.error(error.stack);
  }
}

function logInfo(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] INFO: ${message}`);
}

module.exports = { logError, logInfo };
