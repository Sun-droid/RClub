import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const fetchDataFromKV = async () => {
            try {
                const response = await fetch(`${process.env.KV_REST_API_URL}/get/reservations`, {
                    headers: {
                        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
//                        Authorization: `Bearer ${process.env.KV_REST_API_READ_ONLY_TOKEN}`,
                    },
                    cache: 'no-store'
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch data from KV');
                }

                const parsedResult = await response.json();
//                console.log('Fetched bookings:', JSON.stringify(parsedResult));
                return parsedResult.result

            } catch (error) {
                console.error('Error fetching data:', error);
                return null;
            }
        };

//        console.log("What await response.json() parse: ", await fetchDataFromKV())
        const bookings = await fetchDataFromKV();
//        console.log("Fetched bookings: ", bookings);

console.log('Fetched bookings:', bookings);
//        return NextResponse.json(await fetchDataFromKV());
//        return NextResponse.json(bookings);
//                'Cache-Control': 'no-store  max-age=0',
        return NextResponse.json(bookings, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
            },
        });
    } catch (error) {
        return console.error({error: getErrorMessage(error)}, {status: 500});
    }
}


function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}