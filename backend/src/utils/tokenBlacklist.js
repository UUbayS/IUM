const blacklistedTokens = new Set();

function blacklistToken(token) {
  blacklistedTokens.add(token);
  setTimeout(() => blacklistedTokens.delete(token), 24 * 60 * 60 * 1000);
}

function isTokenBlacklisted(token) {
  return blacklistedTokens.has(token);
}

module.exports = { blacklistToken, isTokenBlacklisted };
