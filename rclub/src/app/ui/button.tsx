'use client'

import {useFormStatus} from 'react-dom'
import {ReactElement} from "react";

export function Button() {
    const {pending} = useFormStatus()
    return (
        <button className="mt-4 w-full h-9 bg-amber-900" type="submit" disabled={pending}>
            <p className="text-white">Signin</p>
        </button>
    )
}

export function ButtonSubmit({children, disabled, styleButton, icon}:{children: React.ReactNode, disabled: boolean, styleButton: string, icon: ReactElement<any, any>}) {
    const {pending} = useFormStatus()
    return (
        <button className={`{/*flex*/} mt-4 w-full h-9 {/*bg-amber-900*/} text-white {/*place-content-center*/} ${styleButton}`} type="submit" disabled={pending}>
            {/*<p className="text-white">Save event</p>*/}
            {/*{icon}*/}
            <div className="text-white">{children}</div>
        </button>
    )
}