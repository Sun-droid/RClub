import {useFormStatus} from 'react-dom'
import {ICard, IScene} from '@/app/types/types'
export function ButtonReserve({dataProp} : {dataProp:ICard}) {
    const { pending } = useFormStatus()
    function handleItemClick(){}
    return (
        <div>
            <button className="bg-orange-900 p-2 px-6 rounded-md" onClick={handleItemClick} type="submit" disabled={pending}>
                <p className="text-white">Reserve</p>
            </button>
        </div>
    )
}