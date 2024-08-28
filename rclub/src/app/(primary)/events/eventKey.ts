export let storedKeyVal: string | null = null;
export async function eventKey(dataVal: string, keyVal: string) {
console.log('Call 4:', storedKeyVal);  // Debugging
    storedKeyVal = String(keyVal);
//    const response = await Promise.resolve(keyVal);
console.log('Call 4.1: ', keyVal)
console.log('Call 4.2:', storedKeyVal);  // Debugging
console.log('Stored keyVal:', storedKeyVal);  // Debugging
    return storedKeyVal
}