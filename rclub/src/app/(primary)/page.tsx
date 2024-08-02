import {Metadata} from 'next'
import LoginPage from "@/app/(primary)/admin/login/page"
import AddEventPage from "@/app/(primary)/admin/dashboard/add/form/page"
import ReserveEventPage from "@/app/(primary)/events/reserve/page"
import ReservationTicketPage from "@/app/(primary)/events/reserve/ticket/page"

export default function Main() {
    return (
        <main className="flex items-center">
            <div>
                <LoginPage/>
                <AddEventPage/>
                <ReserveEventPage dataProp={undefined}/>
                <ReservationTicketPage dataProp={undefined}/>
            </div>
        </main>
    );
}