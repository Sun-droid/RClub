import {promises as fs} from 'fs';
import path from 'path';
import {kv} from '@vercel/kv';
//import { savedAddedValKey } from './savedAddedValKey';
import {savedAddedValKey} from '@/app/(primary)/events/savedAddedValKey';

const eventsDataKey = path.join(process.cwd(), '/src/app/(primary)/database/ReserveObjectKey.json');
export async function storeEventKey() {
    const fileEventsKey = await fs.readFile(eventsDataKey, 'utf8');
    const objectData: string = JSON.parse(fileEventsKey);
    let eventKey = await kv.get('eventKey')

    //Initial
    if (!eventKey) {
        console.log('eventKey 00 base', await kv.get('eventKey'))
        eventKey = await kv.set('eventKey', objectData) || null;
        console.log('eventKey 01 base', await kv.get('eventKey'))
    } else console.log('eventKey has', await kv.get('eventKey'))

    console.log('eventKey init  await kv.get(eventKey', await kv.get('eventKey'))
    console.log('eventKey init typeof ', typeof eventKey)
    let v = ''
    let keyValToSave = await savedAddedValKey(v)
//    (d=>console.log('d', d) )
            console.log('keyValToSave: ', keyValToSave)
            console.log('Call 1: ', keyValToSave)
    try {
        if (Number(keyValToSave) !== 0) {
            console.log('keyValToSave init: ', keyValToSave)
//            if (objectData.length > 0) {
console.log('eventKey', eventKey)
//Clearing the variable before setting new value, unncesseary when workong iwht Vercel KV and the array will alway have one value, being replace with set.
            if (eventKey) {
console.log('eventKey in', eventKey)
                eventKey = '' //removing last or existing key
//                await kv.set('eventKey', eventKey)

                //temp remove one item only
//                while (objectData.length > 0) {
//                    objectData.pop()
//                }
//                const updatedDataKey = JSON.stringify(objectData);
//                await fs.writeFile(eventsDataKey, updatedDataKey);
            } else
                console.log('Missing eventKey, adding new')

//            objectData.push(keyValToSave)
            await kv.set('eventKey', keyValToSave)
//            const updatedDataKey = JSON.stringify(objectData);
//            await fs.writeFile(eventsDataKey, updatedDataKey);
            console.log('eventKey set 00', await kv.get('eventKey'))
        } else
            console.log('eventKey 0', eventKey)

    } catch (error) {
        console.error(error);
    }
}