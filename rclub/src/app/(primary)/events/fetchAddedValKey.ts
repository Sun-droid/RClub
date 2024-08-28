import {storedKeyVal} from './eventKey';


export async function fetchAddedValKey(dataVal: string) {
        console.log('Call 3: ', storedKeyVal)
    if (storedKeyVal !== null) {
        console.log('Call 3.1: ', storedKeyVal)
        return await Promise.resolve(storedKeyVal);
    } else {
        console.error('No stored keyVal available');
        return '';
    }
}