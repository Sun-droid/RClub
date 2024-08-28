import {promises as fs} from 'fs';
import path from 'path';
import {kv} from '@vercel/kv';
//import { savedAddedValKey } from './savedAddedValKey';
import {savedAddedValKey} from '@/app/(primary)/events/savedAddedValKey';

//const eventsDataKey = path.join(process.cwd(), '/src/app/(primary)/database/ReserveObjectKey.json');


export async function storeEventKey() {
//    const fileEventsKey = await fs.readFile(eventsDataKey, 'utf8');


//    const fileEventsKeyPath = path.join(process.cwd(), '/src/app/(primary)/database/ReserveObjectKey.json')
    const fileEventsKeyPath = path.join(process.cwd(), 'src', 'app','(primary)','database', 'ReserveObjectKey.json')
//    const fileEventsKey = await fs.readdir(fileEventsKeyPath,'utf8')
    const fileEventsKey = await fs.readFile(fileEventsKeyPath,'utf8')


//    const fileEventsKey = await fs.readFile(path.join(
//            process.cwd(), "/src/app/(primary)/database/ReserveObjectKey.json",
//        ), "utf8"
//    );

//const fileUserJsonPath = path.join(process.cwd(), '/src/app/lib/data/users.json');
//const fileUserJson = await fs.readFile(fileUserJsonPath, 'utf8')


    const objectData: string = JSON.parse(fileEventsKey);
    let eventKey = await kv.get('eventKey')

    //Initial
    if (!eventKey) {
        eventKey = await kv.set('eventKey', objectData) || null;
    } else console.log('eventKey has', await kv.get('eventKey'))

    let v = ''
    let keyValToSave = await savedAddedValKey(v)
//    (d=>console.log('d', d) )
    try {
        if (Number(keyValToSave) !== 0) {
//            if (objectData.length > 0) {
//Clearing the variable before setting new value, unncesseary when workong iwht Vercel KV and the array will alway have one value, being replace with set.
            if (eventKey) {
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
        }

    } catch (error) {
        console.error(error);
    }
}