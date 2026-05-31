function isValidNISN(nisn) {
  return /^\d{10}$/.test(nisn);
}

function isValidPhone(phone) {
  return /^[0-9+\-\s()]{8,15}$/.test(phone);
}

function isValidDate(dateStr) {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

function isPositiveInt(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
}

module.exports = { isValidNISN, isValidPhone, isValidDate, isPositiveInt };
