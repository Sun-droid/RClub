import React, {useEffect, useState} from 'react';
import {IBookedCount} from '@/app/types/types';

const BookingList: React.FC<IBookedCount> = ({bookedCount}) => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [totalReservations, setTotalReservations] = useState<number>(0);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Fetch from the API
                const response = await fetch('/api/');
                if (!response.ok) {
                    console.error()
                }
//                const {session, data} = await response.json();
                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(getErrorMessage(err));
            }
        };
        fetchBookings();
    }, []);

    useEffect(() => {
        const countReservations = () => {
            const count = bookings.filter(booking => booking.object_reserved.event_id === bookedCount).length;
            setTotalReservations(count);
        };
        countReservations();
    }, [bookings, bookedCount]);

    function getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
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