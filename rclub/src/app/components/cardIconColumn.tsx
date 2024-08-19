// IconColumn.tsx
import React from "react";
import {TrashIcon, PencilIcon} from '@heroicons/react/24/outline';
import ReservationModal from './reservationsModal'
import {IBookedCount} from '@/app/types/types';
import Link from 'next/link'
import {Suspense} from 'react'
import {ICard} from '@/app/types/types'

function SearchBarFallback() {
    return <>placeholder</>
}

interface IProps {
    bookedCount?: IBookedCount,
    cardObj: ICard
}

const IconColumn: React.FC<IProps> = ({cardObj}) => {
    return (
        <div className="flex flex-col justify-between w-full h-full bg-gray-800 p-4 pl-0 pr-0">
            <div className="flex flex-col items-center gap-4">
                <Link href={`/?addmodalform=true&${JSON.stringify(cardObj)}`}>
                    <Suspense fallback={<SearchBarFallback/>}>
                        <button className="text-amber-300">
                            <PencilIcon
                                className="pointer-events-none h-[18px] w-[18px] text-white-300 peer-focus:text-amber-300 m-auto"/>
                        </button>
                    </Suspense>
                </Link>
            </div>
            <div className="w-full text-amber-300 text-center">
                {/*<p>Booked:</p>*/}
                <div className="grid grid-cols-2 grid-rows-1">
                    <div className="col-start-1 col-end-3">
                        <ReservationModal bookedCount={cardObj.id}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-4">
                <Link href={`/?deletemodal=true&${JSON.stringify(cardObj)}`}>
                    <Suspense fallback={<SearchBarFallback/>}>
                        <button className="text-white text-center">
                            <TrashIcon
                                className="pointer-events-none h-[28px] w-[28px] text-red-900 peer-focus:text-amber-300 m-auto"/>
                        </button>
                    </Suspense>
                </Link>
            </div>
        </div>
    );
};

export default IconColumn;