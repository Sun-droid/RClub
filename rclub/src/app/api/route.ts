import {NextResponse} from 'next/server';

//Version with issues that needs fixing
//export async function GET() {
//    try {
////        const res = await fetch('https://...', { next: { revalidate: 60 } })
//        const fetchDataFromKV = async () => {
//            try {
//                const response = await fetch(`${process.env.KV_REST_API_URL}/get/reservations`, {
//                    headers: {
//                        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
//                    },
//                    next: {tags: ['reservations']}
//                })
//                if (!response.ok) {
//                    throw new Error('Failed to fetch data from KV');
//                }
//
//                const parsedResult = await response.json();
////                console.log('Fetched bookings:', JSON.stringify(parsedResult));
//                return parsedResult.result
//
//            } catch (error) {
//                console.error('Error fetching data:', error);
//                return null;
//            }
//        };
//
////        console.log("What await response.json() parse: ", await fetchDataFromKV())
//        const bookings = await fetchDataFromKV();
//
////        console.log("Fetched bookings: ", bookings);
//
////console.log('Fetched bookings:', bookings);
//
////        return NextResponse.json(await fetchDataFromKV());
////        return NextResponse.json(bookings);
////                'Cache-Control': 'no-store  max-age=0',
//        return NextResponse.json(bookings)
//    } catch (error) {
//        return console.error({error: getErrorMessage(error)}, {status: 500});
//    }
//}


//Working version
import { kv } from '@vercel/kv';
import { revalidateTag } from 'next/cache'
import { IReservation } from '../types/types';
import { unstable_noStore as noStore } from 'next/cache';
export async function GET(request: Request) {
  noStore()
  // Fetch data from Vercel KV
  const data =  await kv.get<IReservation[]>('reservations') || []
  // Return the data
  revalidateTag('reservations')
  return NextResponse.json({ data });
}



function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}
