import React, {useEffect, useRef, useState} from 'react';

const BookingModal: React.FC<{ bookedCount: number, isVisible: boolean, onClose: () => void }> = ({
                                                                                                      bookedCount,
                                                                                                      isVisible,
                                                                                                      onClose
                                                                                                  }) => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Fetch from the API
                const response = await fetch('/api/');
                if (!response.ok) {
                    throw new Error('Network response issues');
                }
                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setIsLoading(false)
            }
        };

        if (isVisible) {
            fetchBookings();
        }
    }, [isVisible]);

    function getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };
    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside, isVisible]);

    if (!isVisible) return null;

// Filter bookings to only include those with the required event ID
    const filteredBookings = !isLoading && bookings.length > 0
        ? bookings.filter(booking => booking.object_reserved.event_id === bookedCount)
        : [];
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
            <div ref={modalRef}
                 className="bg-amber-900 p-5 rounded shadow-lg w-full max-w-md mx-4 max-h-[50vh] overflow-hidden"
            >
                <button onClick={onClose} className="mb-4 text-red-500">Close</button>
                {error && <div className="text-red-500">{error}</div>}
                {isLoading ? (<div className="text-sm">Loading bookings...</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="text-sm">No bookings available for this event ID.</div>
                ) : (
                    <div className="overflow-y-auto" style={{maxHeight: '35vh'}}>
                        <table className="min-w-full table-auto text-sm">
                            <thead>
                            <tr>
                                <th className="px-2 py-1">Booked</th>
                                <th className="px-2 py-1">Name</th>
                                <th className="px-2 py-1">Email</th>
                                <th className="px-2 py-1">Event ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredBookings.map(booking => (
                                <tr key={booking.id} className="border-t border-gray-800">
                                    <td className="px-2 py-1">{bookedCount.toString()}</td>
                                    <td className="px-2 py-1">{booking.holder.person_name}</td>
                                    <td className="px-2 py-1">{booking.holder.person_email}</td>
                                    <td className="px-2 py-1">{booking.object_reserved.event_id}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;