import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export default async function middleware(request: NextRequest) {
    const auth = await NextAuth(authConfig).auth(request);

    const url = request.nextUrl.clone();
    const isModalAdd = url.searchParams.get('addmodalform') === 'true';
    const isModalLogin = url.searchParams.get('signmodal') === 'true';
    const isModalReserve = url.searchParams.get('reservemodalform');
    const isModalReservationTicket = url.searchParams.get('reservationticket');

    // Handle redirection for root path when not a modal
    if (url.pathname === '/' && !isModalAdd && !isModalLogin && !isModalReserve && !isModalReservationTicket) {
      url.pathname = '/events'
      return NextResponse.redirect(url)
    }

    // Continue with NextAuth middleware
    return auth;
  }

//export default NextAuth(authConfig).auth;
export const config = {
//    '/((?addmodalform=true).*)'
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$).*)'],
//    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$\\/?addmodalform=true).*)'],
};

//export function savedData(request: NextRequest) {
//    const url = request.nextUrl.clone()
//    const isModal = url.searchParams.get('newmodalform') === 'true';
//    if (url.pathname === '/' && !isModal) {
//        url.pathname = '/events'
//        return NextResponse.redirect(url)
//    }
//}

//<Link href={'/?addmodalform=true'}>
//const addModalForm = searchParams.get("addmodalform");
//matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$`).*)'],

//matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$.\\/?addmodalform=true).*)',],









//import NextAuth from 'next-auth';
//import {authConfig} from './auth.config';
//import {NextResponse} from 'next/server'
//import type {NextRequest} from 'next/server'
//
//
//export default NextAuth(authConfig).auth;
//export const config = {
//    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$).*)'],
//};
//
//export function savedData(request: NextRequest) {
//    const url = request.nextUrl.clone()
//    if (url.pathname === '/') {
//        url.pathname = '/events'
//        return NextResponse.redirect(url)
//    }
//}