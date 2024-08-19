import {Metadata} from 'next'
import LoginPage from "@/app/(primary)/admin/login/page"
import AddEventPage from "@/app/(primary)/admin/dashboard/add/form/page"
import DeleteEventPage from "@/app/(primary)/admin/dashboard/delete/page"
import ReserveEventPage from "@/app/(primary)/events/reserve/page"
import ReservationTicketPage from "@/app/(primary)/events/reserve/ticket/page"

export default function Main() {
    return (
        <main className="flex items-center">
            <div>
                <LoginPage/>
                <AddEventPage/>
                <DeleteEventPage/>
                <ReserveEventPage dataProp={undefined}/>
                {/*<ReservationTicketPage dataProp={undefined}/>*/}
                <ReservationTicketPage/>
            </div>
        </main>
    );
}