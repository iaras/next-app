import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client'; // Prismaクライアントのインポート

const prisma = new PrismaClient();

export async function getSessionUser() {
  const sessionToken = cookies().get('session_token')?.value;
  
  if (!sessionToken) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          token: sessionToken,
          expires: {
            gte: new Date(),
          },
        },
      },
    },
    select: {
      id: true,
      username: true,
    },
  });

  return user;
}