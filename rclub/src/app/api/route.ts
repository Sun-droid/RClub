import {NextResponse} from 'next/server';
import {promises as fs} from 'fs';
import path from 'path';
import {kv} from '@vercel/kv';
import {IReservation} from '../types/types';


const eventsDataReserve = path.join(process.cwd(), '/src/app/(primary)/database/ReserveObject.json');

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src/app/(primary)/database/ReserveObject.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContents);

        let reservations = await kv.get<IReservation[]>('reservations') || []

        if (reservations) {
            return NextResponse.json(reservations);
        } else console.log('reservations has', await kv.get('reservations'))

//        return NextResponse.json(data);
    } catch (error) {
//        return NextResponse.json({error: getErrorMessage(error)}, {status: 500});
        return console.error({error: getErrorMessage(error)}, {status: 500});
    }
}

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}


