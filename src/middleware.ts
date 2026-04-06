import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const payload = await decrypt(session);

      // Simple role-based access control
      if (pathname.startsWith('/dashboard/teacher') && payload.role !== 'TEACHER' && payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/overview', request.url));
      }
      if (pathname.startsWith('/dashboard/parent') && payload.role !== 'PARENT' && payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/overview', request.url));
      }
      if (pathname.startsWith('/dashboard/overview') && payload.role !== 'ADMIN') {
          // If a teacher or parent tries to go to admin overview, redirect to their dashboard
          if (payload.role === 'TEACHER') return NextResponse.redirect(new URL('/dashboard/teacher', request.url));
          if (payload.role === 'PARENT') return NextResponse.redirect(new URL('/dashboard/parent', request.url));
      }

    } catch (err) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect authenticated users away from login/register
  if (pathname === '/login' || pathname === '/register') {
    if (session) {
      try {
        const payload = await decrypt(session);
        if (payload.role === 'ADMIN') return NextResponse.redirect(new URL('/dashboard/overview', request.url));
        if (payload.role === 'TEACHER') return NextResponse.redirect(new URL('/dashboard/teacher', request.url));
        if (payload.role === 'PARENT') return NextResponse.redirect(new URL('/dashboard/parent', request.url));
      } catch (err) {
        // Session invalid, continue to login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
