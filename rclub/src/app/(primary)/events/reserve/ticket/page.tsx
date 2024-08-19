"use client";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import ReservationTicket from '@/app/components/reservation/ticket/reservationmodalticket';
//import {IProps} from '@/app/types/types';
import {ICard} from '@/app/types/types';


const pathname = "/events";
//const ReservationDialog = ({ dataProp }: IProps) => (
//const ReservationDialog = (dataProp: ICard) => (
const ReservationDialog = () => (
    <dialog
        className="fixed flex-col left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
        <div className="flex flex-col items-center justify-center w-full h-3/6 space-y-4">
            <div className="flex w-8/12 h-full bg-amber-700 overflow-scroll">
                <div className="flex flex-row bg-red-900 w-full">
                    {/*<ReservationTicket dataProp={dataProp}/>*/}
                    <ReservationTicket/>
                </div>
            </div>
            <div className="flex flex-row bg-red-900 w-8/12">
                <div className="w-full">
                    {/*<Link href="/events">*/}
                    <Link href={pathname}>
                        <button type="button" className="w-full bg-slate-700 text-white p-2">
                            Close
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </dialog>
);

//export default function ReservationTicketPage({dataProp}: IProps) {
export default function ReservationTicketPage(dataProp: ICard) {
    const searchParams = useSearchParams();
    const reservedModalTicket = searchParams.get("reservationticket");

    return (
        <main className="flex items-center justify-center md:h-screen">
            {/*{reservedModalTicket && <ReservationDialog dataProp={dataProp}/>}*/}
            {reservedModalTicket && <ReservationDialog/>}
        </main>
    );
}