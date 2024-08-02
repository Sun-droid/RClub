import Image from 'next/image';
import Link from 'next/link';
import {Links} from './links'
import {auth} from '@/auth';
import LogoutPage from "@/app/(primary)/admin/logout/page"

const menuItems = [
    {label: `Events`, url: `/events`},
    {label: `Admin sign In`, url: `/?signmodal=true`},
];
const Header = async () => {

    const session = await auth()
    if (session) {
        if ((menuItems.findIndex(i => i.label === "Admin sign In")) !== -1) {
            menuItems.splice(menuItems.findIndex(i => i.label === "Admin sign In"))
        }
    } else {
        if ((menuItems.findIndex(i => i.label === "Admin sign In")) === -1) {
            const menuItemsDesign = menuItems.push({label: `Admin sign In`, url: `/?signmodal=true`})
        }
    }
    return (
        <header className="flex flex-col gap-5 bg-slate-700">
            <div className="py-4 flex justify-between w-full">
                <Link href="/">
                    <Image
                        width={36}
                        height={36}
                        src="/favicon.ico"
                        className="w-8 md:w-9"
                        alt="logo"
                    />
                </Link>
                <nav className="ml-8 w-full">
                    <ul className="flex flex-wrap gap-x-8 text-gray-900 justify-between">
                        {menuItems.map(({url, label}, index) => (
                            <li key={index}>
                                <Links href={url}>{label}</Links>
                            </li>
                        ))}
                        {session &&
                            <li className="justify-end">
                                <LogoutPage/>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
};
export default Header;