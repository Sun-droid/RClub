"use client";
import AddEventForm from '@/app/components/dashboard/forms/add';
import {useSearchParams} from "next/navigation";
import Link from "next/link";

export default function AddEventPage() {
    const searchParams = useSearchParams();
    const addModalForm = searchParams.get("addmodalform");
    const pathname = "/events";
    return (
        <main className="flex items-center justify-center md:h-screen">
            {addModalForm &&
                <dialog
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                    <div className="flex items-center justify-center w-4/12 bg-amber-700 m-auto p-8">
                        <div className="flex flex-col items-center bg-red-900 w-full">
                            <AddEventForm/>
                            <Link className="w-full" href={pathname}>
                                <button type="button" className="w-full bg-slate-700 text-white p-2 ">Cancel</button>
                            </Link>
                        </div>
                    </div>
                </dialog>
            }
        </main>
    );
}