'use server'
//import {submitData, savedAddedReservation, savedAddedValKey} from './addformvalidate';
import {submitData, savedAddedReservation} from './addformvalidate';
import {redirect} from "next/navigation";
import { savedAddedValKey } from '../savedAddedValKey';

export async function addToDataFile(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await submitData(formData)
    } catch (error) {
        console.log(error)
        return 'Database Error: Failed to save.'
    }
    let v = ''
    let addedLast = await savedAddedValKey(v)
    let o = ''
    const addedLastObj = await savedAddedReservation(o)
    if (Number(addedLast) !== 0)
        await redirect(`?reservationticket=${addedLastObj}`)
}