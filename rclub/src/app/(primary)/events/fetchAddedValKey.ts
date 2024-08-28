import {storedKeyVal} from './eventKey';

export async function fetchAddedValKey(dataVal: string) {
    if (storedKeyVal !== null) {
        return await Promise.resolve(storedKeyVal);
    } else {
        console.error('No stored keyVal available');
        return '';
    }
}