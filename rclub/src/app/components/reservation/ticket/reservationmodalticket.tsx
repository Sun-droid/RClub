'use client'

import React, {ReactElement, ReactNode, useMemo, useState, useEffect, useRef} from "react";
import {useSearchParams} from 'next/navigation';
import {Image} from "@nextui-org/react";
import {ICard} from '@/app/types/types';
import {lusitana, dancing_script} from '@/app/ui/fonts';

interface ReservationTicketProps {
    dataProp: ICard | undefined;
}

interface ReservationTicket {
    id: number;
    object_reserved: {
        scene_img: string;
        image_background: string;
        scene_id: string;
        event_id: number;
    };
    holder: {
        person_name: string;
        person_email: string;
        person_phone: string;
    };
}


function useResponsiveFontSize(minSize: number, maxSize: number) {
    const [fontSize, setFontSize] = useState(minSize);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const newSize = Math.max(minSize, Math.min(maxSize, containerWidth / 20)); // Adjust the divisor as needed
                setFontSize(newSize);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [minSize, maxSize]);

    return {fontSize, containerRef};
}

const extractReservationDate = (id: number) => {
    const year = id.toString().slice(0, 4);
    const month = id.toString().slice(4, 6);
    const day = id.toString().slice(6, 8);
    return `${day.replace(/^0+/, '')}/${month.replace(/^0+/, '')} ${year}`;
};

const useReservationData = () => {
    const searchParams = useSearchParams();

    const itemGetObj = useMemo(() => {
        try {
            return JSON.parse(searchParams.get('reservationticket') || '{}') as ReservationTicket;
        } catch (e) {
            console.error('Failed to parse reservation ticket:', e);
            return {} as ReservationTicket;
        }
    }, [searchParams]);

    const reservationDate = useMemo(() => extractReservationDate(itemGetObj.id), [itemGetObj.id]);

    return {itemGetObj, reservationDate};
};

const TicketHeader = ({scene_img, scene_id, reservationDate}: {
    scene_img: string,
    scene_id: string,
    reservationDate: string
}) => (
    <div className="absolute w-full h-full z-10 place-content-center">
        <div className="absolute max-w-[10%] right-0 top-0">
            <div className="flex flex-grow gap-2 items-center rounded-full border-2 border-amber-300">
                <Image alt="Scene" src={scene_img}/>
            </div>
        </div>
        <div className="max-w-[100%] m-auto text-center">
            <div className="max-w-[60%] border-2 m-auto place-content-center">
                <Image removeWrapper className="max-w-[90%] m-auto mt-4 mb-4" alt="Reservation"
                       src="./bg/reservation.png"/>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-white">{scene_id}</p>
            <p className="text-lg sm:text-xl lg:text-xl text-white font-thin">{reservationDate}</p>
        </div>
    </div>
);

export default function ReservationTicket({dataProp}: ReservationTicketProps) {
    const {itemGetObj, reservationDate} = useReservationData();
    const {fontSize, containerRef} = useResponsiveFontSize(12, 24);

    return (
        <div className="space-y-2 w-full overflow-hidden">
            {/* ... rest of the component ... */}
            <div className="relative flex-1 rounded-lg w-full h-full bg-amber-600 px-0 pb-0">
                <div className="w-full h-full block text-xs font-medium text-gray-900">
                    <div
                        className="flex w-full h-full bg-gradient-to-r from-amber-700 via-amber-700 to-transparent to-80% text-gray-900">
                        <div className="flex-box min-w-[75%] h-full border-8 ticketborder">
                            <div className="relative h-full flex-col w-full">
                                <TicketHeader
                                    scene_img={itemGetObj.object_reserved?.scene_img || ''}
                                    scene_id={itemGetObj.object_reserved?.scene_id || ''}
                                    reservationDate={reservationDate}
                                />
                                {/* ... rest of the component ... */}
                                <div className="relative w-full h-full flex items-center z-0 overflow-hidden">
                                    <Image
                                        removeWrapper
                                        alt={'Scene lights'}
                                        className="z-0 w-full h-full object-cover"
                                        src={itemGetObj.object_reserved.image_background}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-box max-w-[0.60%] h-full content-evenly">
                            <Image
                                alt={'Divider'}
                                className="z-0 w-full h-full"
                                src={'./bg/circles-line.png'}
                            />
                            <Image
                                alt={'Divider'}
                                className="z-0 w-full h-full"
                                src={'./bg/circles-line.png'}
                            />
                        </div>
                        <div className="flex-box min-w-[20%] h-full pt-2 m-auto">
                            <div>
                                <div
                                    className="mb-3 mt-0 block text-sm text-white font-medium pl-4 pt-2 pr-1 float-right">
                                    Reservation : {itemGetObj.id.toString().substring(itemGetObj.id, 10)}
                                </div>
                            </div>
                            <div ref={containerRef} className="w-full text-white overflow-auto"
                                 style={{fontSize: `${fontSize}px`}}>
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 w-full overflow-auto text-white break-words pl-2 pr-2">
                                    <div
                                        className={`${dancing_script.className} text-sm sm:text-xl md:text-2xl lg:text-4xl text-amber-900 col-span-full`}>
                                        {itemGetObj.holder?.person_name}
                                    </div>
                                    <div className="text-sm sm:text-xl md:text-2xl lg:text-2xl font-thin col-span-full"
                                         style={{fontSize: 'clamp(12px, 3vw, 24px)'}}>
                                        {itemGetObj.holder?.person_email}
                                    </div>
                                    <div className="text-sm sm:text-xl md:text-2xl lg:text-2xl font-thin col-span-full"
                                         style={{fontSize: 'clamp(12px, 3vw, 24px)'}}>
                                        {itemGetObj.holder?.person_phone}
                                    </div>
                                    <div className="text-sm sm:text-xl md:text-2xl lg:text-xl font-thin pt-2"
                                         style={{fontSize: 'clamp(10px, 2vw, 18px)'}}>Scene
                                    </div>
                                    <div className="text-sm sm:text-xl md:text-2xl lg:text-xl font-thin pt-2"
                                         style={{fontSize: 'clamp(10px, 2vw, 18px)'}}>{itemGetObj.object_reserved?.scene_id}</div>
                                    <div className="text-sm sm:text-xl md:text-2xl lg:text-xl font-thin"
                                         style={{fontSize: 'clamp(10px, 2vw, 18px)'}}>Concert
                                    </div>
                                    <div className="text-sm sm:text-xl md:text-2xl lg:text-xl font-thin"
                                         style={{fontSize: 'clamp(10px, 2vw, 18px)'}}>{itemGetObj.object_reserved?.event_id.toString().slice(-4)}</div>
                                    <div className="text-sm sm:text-xl md:text-2xl lg:text-xl font-thin"
                                         style={{fontSize: 'clamp(10px, 2vw, 18px)'}}>Date
                                    </div>
                                    <div className="text-sm sm:text-xl md:text-2xl lg:text-xl font-thin"
                                         style={{fontSize: 'clamp(10px, 2vw, 18px)'}}>{reservationDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Future
//Mailing ticket
//SMS ticket
//Reminder for cancellation , other