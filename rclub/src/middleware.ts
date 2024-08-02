import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'


export default NextAuth(authConfig).auth;
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$).*)'],
};

export function savedData(request: NextRequest) {
    const url = request.nextUrl.clone()
    if (url.pathname === '/') {
        url.pathname = '/events'
        return NextResponse.redirect(url)
    }
}