import {NextResponse} from 'next/server';
import {promises as fs} from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src/app/(primary)/database/ReserveObject.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({error: getErrorMessage(error)}, {status: 500});
    }
};

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}