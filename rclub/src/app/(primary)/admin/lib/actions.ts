'use server'
//import {savedAddedValKey, submitData} from './addformvalidate';
import {submitData} from './addformvalidate';
import { savedAddedValKey } from '@/app/(primary)/events/savedAddedValKey';
import {redirect} from "next/navigation";

export async function addToDataFile(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await submitData(formData, 'create')
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

export async function updateDataFile(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await submitData(formData, 'update')
    } catch (error) {
        console.log(error)
        return 'Database Error: Failed to update.'
    }
    //Temporary approach for update
    let v = ''
    let addedLast = await savedAddedValKey(v)
    if (Number(addedLast) !== 0)
        await redirect(`/events/`)
}

export async function deleteObject(
    prevState: string | undefined,
    formData: FormData
) {

//Insecure delete since the param manipulation posts different data. The entire object comparison may provide better security
//        await submitDeletion(formData)


    try {
        await submitData(formData, 'delete')
    } catch (error) {
        console.log(error)
        return 'Database Error: Failed to delete.'
    }
    //Temporary approach for deletion
    let v = ''
    let addedLast = await savedAddedValKey(v)
    if (Number(addedLast) !== 0)
        await redirect(`/events/`)


    return 'Database Error: Failed to delete.'
}