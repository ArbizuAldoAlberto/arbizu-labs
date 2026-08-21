import { NextRequest, NextResponse } from 'next/server';
import { getWarroomSecret, getSessionToken, verifyWarroomSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    const secret = getWarroomSecret();

    if (!password || password !== secret) {
      return NextResponse.json({ error: 'Contraseña no válida o no autorizada' }, { status: 401 });
    }

    const sessionToken = getSessionToken();
    const response = NextResponse.json({ success: true, message: 'Autenticación exitosa' }, { status: 200 });

    response.cookies.set('warroom_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Error in War Room auth POST:', error);
    return NextResponse.json({ error: 'Error procesando la solicitud de autenticación' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const response = NextResponse.json({ success: true, message: 'Sesión cerrada correctamente' }, { status: 200 });

    response.cookies.set('warroom_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    console.error('Error in War Room auth DELETE:', error);
    return NextResponse.json({ error: 'Error cerrando sesión' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const cookieValue = req.cookies.get('warroom_session')?.value;
  const headerValue = req.headers.get('x-warroom-auth') || req.headers.get('authorization')?.replace('Bearer ', '');
  const isAuthenticated = verifyWarroomSession(cookieValue, headerValue);

  return NextResponse.json({ authenticated: isAuthenticated }, { status: 200 });
}
