'use client'
import React, {useState} from 'react';
import BookingList from './bookingList';
import BookingModal from './bookingModal';
import {InformationCircleIcon} from '@heroicons/react/24/outline';
import {IBookedCount} from '@/app/types/types';

const ReservationModal: React.FC<IBookedCount> = ({bookedCount}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <div>
            <button
                onClick={() => setIsModalVisible(true)}>
                <InformationCircleIcon
                    className="pointer-events-none h-[28px] w-[28px] text-white-300 peer-focus:text-amber-300 m-auto"/>
            </button>
            <BookingList bookedCount={bookedCount}/>
            <BookingModal bookedCount={bookedCount} isVisible={isModalVisible}
                          onClose={() => setIsModalVisible(false)}/>
        </div>
    );
};

export default ReservationModal;