export let storedKeyVal: string | null = null;

export async function eventKey(dataVal: string, keyVal: string) {
    storedKeyVal = String(keyVal);
    return storedKeyVal
}