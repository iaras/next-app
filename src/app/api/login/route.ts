import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
//import { serialize } from 'cookie';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = uuidv4();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week from now

  await prisma.session.create({
    data: {
      token,
      userId: user.id,
      expires,
    },
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set('session_token', token, {
    httpOnly: true,
    expires,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}