'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'

export function Links({href, children}: { href: string, children: string }) {

    const pathname = usePathname()
    const active = href === pathname;
    return (
        <nav>
            <ul>
                <li>
                    <Link
                        href={href}
                        className={`hover:text-amber-500 p-2 rounded block ${
                            active ||
                            (href.startsWith('/other') &&
                                pathname.startsWith('/other'))
                                ? 'text-amber-500 font-semibold'
                                : 'text-gray-300'
                        }`}
                    >
                        {children}
                    </Link>
                </li>
            </ul>
        </nav>
    )
}