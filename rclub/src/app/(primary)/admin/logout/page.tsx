import {PowerIcon} from '@heroicons/react/24/outline';
import {signOut} from '@/auth';

export default function LogoutPage() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}
        >
            <button className="flex gap-2 text-white hover:text-amber-500 md:p-2 md:px-3">
                <PowerIcon className="w-6"/>
                <div className="hidden md:block">Sign Out</div>
            </button>
        </form>
    );
}