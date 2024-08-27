import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'
import {promises as fs} from 'fs';
import path from 'path';
import {ICard, IPerson, ITicket, IReservation} from '@/app/types/types'
import {kv} from '@vercel/kv';


const eventsDataReserve = path.join(process.cwd(), '/src/app/(primary)/database/ReserveObject.json');


async function storeEvent(event: IReservation): Promise<IReservation | undefined> {
    const fileEvents = await fs.readFile(eventsDataReserve, 'utf8');
    const objectData = JSON.parse(fileEvents);
    let reservations = await kv.get<IReservation[]>('reservations') || []
//    console.log('reservations base', await kv.get('reservations'))
//    console.log('reservations reservations base length', reservations.length)
    if (!reservations) {
//        console.log('reservations 00 base', await kv.get('reservations'))
        //Loading the initial values / if any
        await kv.set('reservations', objectData);
//        console.log('reservations 01 base', await kv.get('reservations'))
    } else console.log('reservations has', await kv.get('reservations'))

//        const reservations = await kv.get<IReservation[]>('reservations') || [];

//    console.log('reservations', reservations)

    let v = ""
    let dataVal = event
    let dataValToSave: IReservation[] = []
    const ts = 'ad'
    const ts1 = ''
    try {
        //All if-condition working, paused. 
        if (event) { //Values stored?
            if (event.holder.person_name) { //Double check
//                objectData.push(dataVal)
//            console.log('In');
                reservations.push(event)
//                const updatedData = JSON.stringify(objectData);

//                const updatedData = JSON.stringify(objectData, null, 2);
//                //            // Write the updated data to the JSON file
//                await fs.writeFile(eventsDataReserve, updatedData);

                await kv.set('reservations', reservations)
//                console.log('reservations 00', reservations)
                return event
            }
        } else {
            console.log('Invalid reservation data');
            return undefined;
        }
    } catch (error) {
        console.error(error);
        return undefined
        // Send an error response
        //            res.status(500).json({ message: 'Error storing data' });
    }
}

let keyVal: number | undefined = 0
let objValInDatabase: IReservation = {
    id: 0,
    holder: {
        id: 0,
        person_name: '',
        person_email: '',
        person_phone: 0
    },
    object_reserved: {
        id: 0,
        person_id: 0,
        event_id: '',
        image_background: '',
        scene_id: '',
        scene_img: ''
    }
}

export const submitData = async (formData: FormData) => {
    const date = new Date()
    const idString = JSON.stringify(date)
    const idMatch = idString.replace(/[^\d\.]*/g, '')
    const id = parseInt(idMatch)
    //Scene values
    const sceneRokrock = 'Rokrock'
    const sceneRokrockImg = './images/rokrock.png'
    const sceneTrenchcoat = 'Trenchcoat'
    const sceneTrenchcoatImg = './images/trenchcoat.png'
    const sceneLangrock = 'Langrock'
    const sceneLangrockImg = './images/langrock.png'

    //scene_id
    const sceneId = formData.get('scene_title')
    let dataMapIReservation = new Map<string, string | number | IPerson | ITicket>()
    let dataMapIPerson = new Map<string, string | number | IPerson>()
    let dataMapITicket = new Map<string, string | number | ITicket>()
    const oV = JSON.parse(String(formData.get('obj_pass')))
    let dataMapBuild = new Map<string, string | number>()
    let n = 0
    let t: ICard = {
        id: 0,
        title_main: '',
        title_description: '',
        scene_id: '',
        scene_img: '',
        image_alt: '',
        image_background: '',
        icon_alt: '',
        icon_img: '',
        bottom_title: '',
        bottom_description: '',
        button_reserve: ''
    }
    for (const v of Object(formData.entries())) {
        if (n == 0)
            dataMapBuild.set('id', id)

        if (n == 0) {
            dataMapIReservation.set('id', id)
            dataMapIPerson.set(v[0], v[1])
        }
        if (n == 1)
            dataMapBuild.set(v[0], v[1])

        if (n == 1) {
            dataMapIPerson.set(v[0], v[1])
        }
        if (n == 2)
            dataMapBuild.set(v[0], v[1])

        if (n == 2) {
            const pId = id + v[1].match(/^\d{4}/)[0]
            dataMapIPerson.set('id', pId)
            dataMapITicket.set('person_id', pId)
            //Position being handle by fn below. Ticket id will go before person_id
            dataMapITicket.set('id', id + pId)
            dataMapITicket.set('event_id', oV.id)
            dataMapITicket.set('image_background', oV.image_background)
            dataMapITicket.set('scene_id', oV.scene_id)
            dataMapITicket.set('scene_img', oV.scene_img)
            dataMapIPerson.set(v[0], v[1])
        }
        if (n == 3) {
            t = JSON.parse(v[1])
            dataMapBuild.set('scene', v[1])
        }
        n++
    }
    const objectInterfaceIPersonMap = dataMapIPerson.entries() as unknown as IPerson
    const objectInterfaceIPerson = Object.fromEntries(Object(objectInterfaceIPersonMap))
    const vta = Object.entries(objectInterfaceIPerson)
    const rv0 = array_positioning(Object.values(objectInterfaceIPerson), 1, 2)
    const rv = array_positioning(vta, 1, 2)
    const rvId = array_positioning(vta, 0, 2)
    const rvIdName = array_positioning(rvId, 1, 2)
    const objectInterfaceITicketMap = dataMapITicket.entries() as unknown as ITicket
    const objectInterfaceITicket = Object.fromEntries(Object(objectInterfaceITicketMap))
    const vtaTicket = Object.entries(Object(objectInterfaceITicket))
    const rvTicket = array_positioning(Object.values(vtaTicket), 0, 1)
    dataMapIReservation.set('holder', JSON.parse(JSON.stringify(Object.fromEntries(rvIdName))))
    dataMapIReservation.set('object_reserved', JSON.parse(JSON.stringify(Object.fromEntries(rvTicket))))
    const dt: IReservation = {
        id: Number(dataMapIReservation.get('id')),
        holder: dataMapIReservation.get('holder') as IPerson,
        object_reserved: dataMapIReservation.get('object_reserved') as ITicket
    }
    const wv_obj = await storeEvent(dt).then(r => {
        console.log('saved', r?.id);
        return objValInDatabase = r!
    })
    keyVal = objValInDatabase.id

    function createPost() {
//                try {
//                    // Call database
//                } catch (error) {
//                    // Handle errors
//                    if (isRedirectError(error)) {
//                        throw error;
//                    }
//                }
//                revalidatePath('/?addmodalform=true')

//Needs review - Potentially causing - WebSocket connection to 'ws://localhost:3000/_next/webpack-hmr' failed: WebSocket is closed due to suspension.
//        revalidatePath('/?reservemodalform=')
//        redirect(`/events`)
    }

    let sv = ''
    savedAddedValKey(sv)
    storeEventKey()
}

export async function fetchAddedValKey(dataVal: string) {
    const response = await keyVal;
//    See actions - need to convert/(pass param) to/as number already here 
    dataVal = String(response)
    return dataVal
}

export async function savedAddedValKey(sv: string) {
    let v = ""
    let dataVal = ""
    dataVal = await fetchAddedValKey(v)
    sv = dataVal
    return sv
}

const eventsDataKey = path.join(process.cwd(), '/src/app/(primary)/database/ReserveObjectKey.json');

async function storeEventKey() {
    const fileEventsKey = await fs.readFile(eventsDataKey, 'utf8');
    const objectData: string = JSON.parse(fileEventsKey);
    let eventKey = await kv.get('eventKey')

    if (!eventKey) {
        console.log('eventKey 00 base', await kv.get('eventKey'))
        eventKey = await kv.set('eventKey', objectData) || null;
        console.log('eventKey 01 base', await kv.get('eventKey'))
    } else console.log('eventKey has', await kv.get('eventKey'))

    console.log('eventKey init  await kv.get(eventKey', await kv.get('eventKey'))
    console.log('eventKey init typeof ', typeof eventKey)
    let v = ''
    let keyValToSave = await savedAddedValKey(v)
    try {
        if (Number(keyValToSave) !== 0) {
            console.log('keyValToSave init', keyValToSave)
//            if (objectData.length > 0) {
            if (!eventKey) {
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

function array_positioning(obj: any[], current_index: number, new_index: number) {
    while (current_index < 0) {
        current_index += obj.length;
    }
    while (new_index < 0) {
        new_index += obj.length;
    }
    if (new_index >= obj.length) {
        var k = new_index - obj.length + 1;
        while (k--) {
            //            arr.push(undefined);
        }
    }
    obj.splice(new_index, 0, obj.splice(current_index, 1)[0]);
    return obj; // for testing purposes
//    throw new Error('Function not implemented.');
}

export async function fetchAddedValObj(dataVal: string) {
    const response = await objValInDatabase;
//    See actions - need to convert/(pass param) to/as number already here 
    dataVal = JSON.stringify(response)
    return dataVal
}

export async function savedAddedReservation(sv: string) {
    let v = ""
    let dataVal = ""
    dataVal = await fetchAddedValObj(v)
    sv = dataVal
    return sv
}