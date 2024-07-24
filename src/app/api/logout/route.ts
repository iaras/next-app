import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  // Clear the session cookie
  const cookie = serialize('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  });

  const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  response.headers.set('Set-Cookie', cookie);

  return response;
}