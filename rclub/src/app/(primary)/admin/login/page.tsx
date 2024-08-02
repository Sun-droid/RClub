"use client";
import LoginForm from '@/app/ui/login-form';
import {useSearchParams} from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const signModal = searchParams.get("signmodal");
    const pathname = "/events";
    return (
        <main className="flex items-center justify-center md:h-screen">
            {signModal &&
                <dialog
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                    <div className="bg-amber-700 m-auto p-8">
                        <div className="flex flex-col items-center">
                            <div
                                className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                                <div
                                    className="flex h-20 w-full rounded-lg bg-yellow-950 p-3 md:h-36 place-content-center">
                                    <div className="w-full text-white m-auto text-center">
                                        <h1> Message to user </h1>
                                        <p> Login using the temporary <br/> credentials in the fields</p>
                                    </div>
                                </div>
                            </div>
                            <h3>Admin login</h3>
                            <br/>
                            <LoginForm/>
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
