'use server'
import {submitData} from './addformvalidate';
import {redirect} from "next/navigation";
import {savedAddedValKey} from './addformvalidate'

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
    if (Number(addedLast) !== 0)
        await redirect(`/events/`)
}

export async function addImageFilePath() {
    const response = await fetch('https://picsum.photos/200');
    return response.url
}