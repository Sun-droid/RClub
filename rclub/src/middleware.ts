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


//    console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
//    console.log(" token ", token)

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

    const isAdminModal = url.searchParams.has('addmodalform') ||
        url.searchParams.has('deletemodal');

    const isSignModal = url.searchParams.has('signmodal');

    // Always redirect to /events unless it's a modal
    if (url.pathname === '/' && !isModal) {
        url.pathname = '/events';
        return NextResponse.redirect(url);
    }


// Allow access to modals on the root path
    if (url.pathname === '/' && isModal) {
        // Check for admin modals
        if (isAdminModal && !token) {
            // Redirect to login if trying to access admin modal without being logged in
//            url.pathname = '/?signmodal=true';
//            url.search = '';
            url.pathname = '/';
            url.searchParams.set('signmodal', 'true');
            return NextResponse.redirect(url);
        }

//        This is working
//        if (token && url.search == '?signmodal=true') {
        if (token && isSignModal) {
            url.pathname = '/events';
            url.search = '';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$).*)'],
};