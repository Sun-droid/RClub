import Calendar from "@/app/components/calendar";
import AddModal from "@/app/components/addmodal";
import EventsListLayout from './eventlist/layout'
import {auth} from '@/auth'

function SearchBarFallback() {
    return <>placeholder</>
}

const th1: string = 'fc-dom-86';
export default async function EventsScreen() {
    const session = await auth()
    return (
        <div className="grid grid-cols-12 gap-3 bg-amber-700 /*px-4*/ justify-between rounded ">
            <aside className="col-span-12 sm:col-span-5 p-6 rounded">
                <div className="p-6 bg-amber-500">
                    <h1>Hello, Tickets side!</h1>
                </div>
                <div className=" p-10 bg-amber-600">
                    <Calendar/>
                </div>
            </aside>
            <div className="col-span-12 sm:col-span-7 bg-gray-700 p-4 rounded-l min-h-[500px]">
                {!session &&
                    <h1>Hello, Tickets Page right!</h1>
                }
                {session &&
                    <>
                        <div>
                            <h1>Events editor</h1>
                        </div>
                        <div>
                            <AddModal/>
                        </div>
                    </>
                }
                <EventsListLayout/>
            </div>
        </div>
    )
}