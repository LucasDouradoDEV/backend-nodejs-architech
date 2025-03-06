import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Recupera todos os usuários
    const users = await prisma.user.findMany();

    // Atualiza os emails para letras minúsculas
    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { email: user.email.toLowerCase() },
      });
    }

    console.log('Migração concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a migração:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();