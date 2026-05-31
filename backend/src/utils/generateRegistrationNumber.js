const prisma = require('../config/prisma');

const MAX_RETRIES = 3;

async function generateRegistrationNumber() {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await prisma.$transaction(async (tx) => {
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
    } catch (error) {
      if (error.code === 'P2002' && attempt < MAX_RETRIES) {
        continue;
      }
      throw error;
    }
  }
}

module.exports = generateRegistrationNumber;
