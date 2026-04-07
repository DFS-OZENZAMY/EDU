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
      const role = payload.role;

      // Super Admin restriction
      if (pathname.startsWith('/dashboard/super') && role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/overview', request.url));
      }

      // School Admin / Admin restrictions
      if (pathname.startsWith('/dashboard/overview') && role !== 'SCHOOL_ADMIN' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
         if (role === 'TEACHER') return NextResponse.redirect(new URL('/dashboard/teacher', request.url));
         if (role === 'PARENT') return NextResponse.redirect(new URL('/dashboard/parent', request.url));
         if (role === 'SUPER_ADMIN') return NextResponse.redirect(new URL('/dashboard/super', request.url));
      }

      // Teacher dashboard restriction
      if (pathname.startsWith('/dashboard/teacher') && !['TEACHER', 'SCHOOL_ADMIN', 'ADMIN', 'SUPER_ADMIN'].includes(role)) {
        return NextResponse.redirect(new URL('/dashboard/overview', request.url));
      }

      // Parent dashboard restriction
      if (pathname.startsWith('/dashboard/parent') && !['PARENT', 'SCHOOL_ADMIN', 'ADMIN', 'SUPER_ADMIN'].includes(role)) {
        return NextResponse.redirect(new URL('/dashboard/overview', request.url));
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
        const role = payload.role;
        if (role === 'SUPER_ADMIN') return NextResponse.redirect(new URL('/dashboard/super', request.url));
        if (role === 'SCHOOL_ADMIN' || role === 'ADMIN') return NextResponse.redirect(new URL('/dashboard/overview', request.url));
        if (role === 'TEACHER') return NextResponse.redirect(new URL('/dashboard/teacher', request.url));
        if (role === 'PARENT') return NextResponse.redirect(new URL('/dashboard/parent', request.url));
      } catch (err) {
        // Session invalid
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
