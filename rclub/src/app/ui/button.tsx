'use client'

import {useFormStatus} from 'react-dom'

export function Button() {
    const {pending} = useFormStatus()
    return (
        <button className="mt-4 w-full h-9 bg-amber-900" type="submit" disabled={pending}>
            <p className="text-white">Signin</p>
        </button>
    )
}

export function ButtonSubmit() {
    const {pending} = useFormStatus()
    return (
        <button className="mt-4 w-full h-9 bg-amber-900" type="submit" disabled={pending}>
            <p className="text-white">Save event</p>
        </button>
    )
}