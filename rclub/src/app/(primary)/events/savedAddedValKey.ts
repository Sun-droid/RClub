import {fetchAddedValKey} from "./fetchAddedValKey"

export async function savedAddedValKey(_sv: string) {
    console.log('Call 2: ', _sv)
    return await fetchAddedValKey(_sv)
}