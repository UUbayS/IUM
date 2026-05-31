const prisma = require('../config/prisma');

async function generateRegistrationNumber() {
  const year = new Date().getFullYear();

  const count = await prisma.registration.count({
    where: {
      registrationNumber: {
        startsWith: `PSB-${year}`,
      },
    },
  });

  const nextNumber = String(count + 1).padStart(4, '0');

  return `PSB-${year}-${nextNumber}`;
}

module.exports = generateRegistrationNumber;
