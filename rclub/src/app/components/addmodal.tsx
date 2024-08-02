'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import {ButtonAdd} from '@/app/components/dashboard/buttons'
function SearchBarFallback() {
    return <>placeholder</>
}
export default function AddModal() {
    return (
        <Link href={'/?addmodalform=true'}>
            <Suspense fallback={<SearchBarFallback />}>    
                <ButtonAdd/>
            </Suspense>
        </Link>
    )
}