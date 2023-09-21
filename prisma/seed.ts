import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      name: 'admin',
      password: '$2b$10$NAHJ/zWy46esn0NOXnWo3erEJU8TizLOgq7sWzDNPvUrC2njGNuWm',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
