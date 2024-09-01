import React, {useEffect, useState} from 'react';
import {IBookedCount, IReservation} from '@/app/types/types';

const BookingList: React.FC<IBookedCount> = ({bookedCount}) => {
    const [bookings, setBookings] = useState<IReservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [totalReservations, setTotalReservations] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setIsLoading(true);
                // Fetch from the API
                const response = await fetch('/api/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
                setBookings(parsedData);
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();

//            setInterval(fetchBookings, 5000); // Poll every 5 seconds



    }, []);



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