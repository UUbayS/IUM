const prisma = require('../config/prisma');

async function generateRegistrationNumber() {
  return prisma.$transaction(async (tx) => {
    const year = new Date().getFullYear();

    const lastRegistration = await tx.registration.findFirst({
      where: {
        registrationNumber: {
          startsWith: `PSB-${year}`,
        },
      },
      orderBy: {
        registrationNumber: 'desc',
      },
    });

    let nextNumber = 1;

    if (lastRegistration) {
      const lastNumber = parseInt(
        lastRegistration.registrationNumber.split('-')[2],
        10
      );
      nextNumber = lastNumber + 1;
    }

    return `PSB-${year}-${String(nextNumber).padStart(4, '0')}`;
  });
}

module.exports = generateRegistrationNumber;
