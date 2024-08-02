import { useFormStatus } from "react-dom"

export function ButtonsBar() {
    const { pending } = useFormStatus()

    return (
        <button className="mt-4 w-full h-9 bg-amber-900" type="submit" disabled={pending}>
            <p className="text-white">Add event</p>
        </button>
    )
}