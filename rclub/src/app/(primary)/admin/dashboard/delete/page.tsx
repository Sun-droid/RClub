"use client";
import DeleteModalCard from '@/app/components/dashboard/delete/deletemodalcard';
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {useEffect, useRef} from 'react';
import {useRouter} from 'next/navigation';

export default function DeleteEventPage() {
    const searchParams = useSearchParams();
    const addModalForm = searchParams.get("deletemodal");
    const pathname = "/events";
    const divRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const currentDialog = divRef.current;
            if (currentDialog && !currentDialog.contains(event.target as Node)) {
                router.push(pathname)
            }
        };

        document.addEventListener('click', handleClickOutside);

        // Clean up: remove event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [router]);

    return (
        <main className="flex items-center justify-center md:h-screen">
            {addModalForm &&
                <dialog
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                    <div className="flex items-center justify-center w-4/12 bg-amber-700 m-auto p-8"
                         onClick={(e) => e.stopPropagation()}>
                        <div ref={divRef} className="flex flex-col items-center bg-red-900 w-full">
                            <DeleteModalCard dataProp={undefined}/>
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