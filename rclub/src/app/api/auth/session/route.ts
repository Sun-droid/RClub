// src/app/api/auth/session/route.ts
import {NextResponse} from 'next/server';
import {auth} from '@/auth';

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return new Response(null, {status: 401});
        }
        console.log("GET001 ", session)
        return NextResponse.json(session);
    } catch (error) {
        return NextResponse.json({error: getErrorMessage(error)}, {status: 500});
    }
}

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}