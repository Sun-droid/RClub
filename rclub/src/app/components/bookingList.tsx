import React, {useEffect, useState} from 'react';
import {IBookedCount, IReservation} from '@/app/types/types';
import actionRevalidate from './revalidateTag';

const BookingList: React.FC<IBookedCount> = ({bookedCount}) => {
    const [bookings, setBookings] = useState<IReservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [totalReservations, setTotalReservations] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setIsLoading(true);
                // Fetch from the API
                const response = await fetch(`/api/?t=${new Date().getTime()}`, {
//                const response = await fetch(`/api/?timestamp=${Date.now()}`, {
                    method: 'GET',
                    cache: 'no-store'
                });
                await actionRevalidate()
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('reservations client', data)
                const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

//                console.log("response ", Object.entries(parsedData)[0][1])
//                console.log("response ", parsedData)
//                const bookings = data.data || []
                console.log("response ", bookings)
                setBookings(parsedData);
//                setBookings(bookings);
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setIsLoading(false);
                setCount(1);
            }
        };
        fetchBookings();
    }, []);


    useEffect(() => {
        console.log(`Count has changed to: ${count}`);
    }, [count]);



    useEffect(() => {
        const countReservations = () => {
            const count = bookings.filter(booking => Number(booking.object_reserved.event_id) === bookedCount).length;
            setTotalReservations(count);
        };
        countReservations();
    }, [bookings, bookedCount]);

    function getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!bookings || bookings.length === 0) {
        return <div>No bookings available</div>;
    }
    return (
        <div className="booking-list">
            {bookings.length === 0 ? (
                <div>No bookings available</div>
            ) : (
                <div className="font-thin mb-4">Reservations {totalReservations}</div>
            )}
        </div>
    );
};
export default BookingList;