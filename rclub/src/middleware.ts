import {authConfig} from './auth.config';
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import getServerSession from 'next-auth';
import {getToken} from 'next-auth/jwt';


export default async function middleware(req: NextRequest, res: NextResponse) {
    if (!process.env.NEXTAUTH_SECRET) {
        console.error("NEXTAUTH_SECRET is not defined");
        return new Response("Internal Server Error", {status: 500});
    }

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NEXTAUTH_SECRET === "production",
        salt:
            process.env.NEXTAUTH_SECRET === "production"
                ? "__Secure-authjs.session-token"
                : "authjs.session-token",
    });

    const authSecret = process.env.NEXT_PUBLIC_;
    const session = getServerSession(authConfig);
    const requestHeaders = new Headers(req.headers);
    // Add field to request headers
    requestHeaders.set("X-User-Session", "UserSessionData");


    console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
    console.log(" token ", token)

    // Allow access to the API
    const isApiRoute = req.nextUrl.pathname.startsWith('/api/');
    if (isApiRoute) {
        return NextResponse.next();
    }
    const url = req.nextUrl.clone();

    const isModal = url.searchParams.has('addmodalform') ||
        url.searchParams.has('deletemodal') ||
        url.searchParams.has('signmodal') ||
        url.searchParams.has('reservemodalform') ||
        url.searchParams.has('reservationticket');

    // Always redirect to /events unless it's a modal
    if (url.pathname === '/' && !isModal) {
        url.pathname = '/events';
        return NextResponse.redirect(url);
    }

    // Allow access to modals on the root path
    if (url.pathname === '/' && isModal) {
        return NextResponse.next();
    }


//    const isModalAdd = url.searchParams.get('addmodalform') === 'true';
//    const isModalDelete = url.searchParams.get('deletemodal') === 'true';
//    const isModalLogin = url.searchParams.get('signmodal') === 'true';
//    const isModalReserve = url.searchParams.get('reservemodalform');
//    const isModalReservationTicket = url.searchParams.get('reservationticket');
////    adminLog(req, res)
//    // Handle redirection for root path when not a modal
//    if (url.pathname === '/') {
//        if (token) {
//            if (!isModalAdd && !isModalReserve && !isModalReservationTicket && !isModalDelete) {
//                url.pathname = '/events'
//                return NextResponse.redirect(url)
//            }
//        } else {
//            if (!isModalLogin && !isModalReserve && !isModalReservationTicket) {
//                url.pathname = '/events'
//                return NextResponse.redirect(url)
//            }
//        }
//    }

//    return NextResponse.next({request: {headers: requestHeaders}});
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$).*)'],
};