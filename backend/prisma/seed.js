const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.admin.upsert({
    where: {
      email: 'admin@pondok.sch.id',
    },
    update: {},
    create: {
      name: 'Admin PSB',
      email: 'admin@pondok.sch.id',
      password: hashedPassword,
    },
  });

  console.log('Admin berhasil dibuat');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
