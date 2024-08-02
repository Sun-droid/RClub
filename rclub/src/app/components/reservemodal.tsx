'use client'

import Link from 'next/link'
import {Suspense} from 'react'
import {ButtonReserve} from '@/app/components/reservation/buttons'
import {ICard} from '../types/types'

function SearchBarFallback() {
    return <>placeholder</>
}

export default function ReserveModal({dataProp}: { dataProp: ICard }) {
    const v = JSON.stringify(dataProp)
    return (
        //Unsafe object data - Future work
        <Link href={`/?reservemodalform=${v}`}>
            <Suspense fallback={<SearchBarFallback/>}>
                <ButtonReserve dataProp={dataProp}/>
            </Suspense>
        </Link>
    )
}