// src/app/api/auth/session/route.ts
import {NextResponse} from 'next/server';
import {auth} from '@/auth';

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return new Response(null, {status: 401});
        }
        return NextResponse.json(session);
    } catch (error) {
        return NextResponse.json({error: getErrorMessage(error)}, {status: 500});
    }
}

//import NextAuth from 'next-auth';
//import { authConfig } from '@/auth.config';
//
//const handler = NextAuth(authConfig);
//
//export { handler as GET, handler as POST };



function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}