import type {User} from '@/app/lib/definitions';
import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'
import {promises as fs} from 'fs';
import path from 'path';
import {ICard} from '@/app/types/types';

const eventsData = path.join(process.cwd(), '/src/app/(primary)/database/EventsData.json');
const eventsData1 = path.join(process.cwd(), '/src/app/(primary)/database/EventsData1.json');

async function storeEvent(event: ICard): Promise<ICard | undefined> {
    const fileEvents = await fs.readFile(eventsData1, 'utf8');
    const objectData = JSON.parse(fileEvents);
    let v = ""
    let dataVal = event
    const ts = 'ad'
    const ts1 = ''
    try {
        if (dataVal) {
            if (dataVal.title_description) {
                objectData.array_elem.push(dataVal)
                const updatedData = JSON.stringify(objectData);
                await fs.writeFile(eventsData1, updatedData);
            }
        } else {
        }
    } catch (error) {
        console.error(error);
    }
    return event
}

async function getUser(email: string): Promise<User | undefined> {
    const fileUserJson = await fs.readFile(process.cwd() + '/src/app/lib/data/users.json', 'utf8');
    const dataUserJson = JSON.parse(fileUserJson)
    const dataProp = dataUserJson.array_elem[0]
    const userPasswordData: string = dataProp.password
    const userMailData: string = dataProp.email
    try {
        if (dataProp.email === email) {
            return {email: userMailData, password: userPasswordData};
        }
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

let keyVal: number | undefined = 0
export const submitData = async (formData: FormData) => {
    //Radio options and object cases
    const imageLabel = formData.get('button-types-image') // 1. Fill in automatically - 2. Fill in automatically - 3. Fill in automatically - 4. null - 5. null - 6. Use default
    const imageField = formData.get('image_background') // 1. https:// - 2. https:// - 3. https:// - 4. string - 5. string - 6. Default
    const logoLabel = formData.get('button-types-logo') // 1. null - 2. Use default - 3. Fill in automatically - 4. Use default -  5. null - 6. null
    const logoField = formData.get('image_background_logo') //1. string - 2. Default - 3. https:// - 4. Default - 5. string -  6. string
    //Default values
    const pathImageDefault = "./images/card-example-5.jpeg"
    const pathLogoDefault = "./images/breathing-app-icon.jpeg"
    const buttonStringKey = 'button_reserve'
    const buttonStringVal = 'Reserve'
    const date = new Date()
    const idString = JSON.stringify(date)
    const idMatch = idString.replace(/[^\d\.]*/g, '')
    const id = parseInt(idMatch)
    const sceneRokrock = 'Rokrock'
    const sceneRokrockImg = './images/rokrock.png'
    const sceneTrenchcoat = 'Trenchcoat'
    const sceneTrenchcoatImg = './images/trenchcoat.png'
    const sceneLangrock = 'Langrock'
    const sceneLangrockImg = './images/langrock.png'
    const sceneId = formData.get('scene_title')
    let dataMapBuild = new Map<string, string | number>()
    let n = 0
    for (const v of Object(formData.entries())) {
        if (n == 0)
            dataMapBuild.set('id', id)
        if (v[0] === 'button-types-image' && v[1] === 'Fill in automatically')
            continue
        else if (v[0] === 'button-types-image' && v[1] === 'Use default')
            continue
        else if (v[0] === 'image_background' && v[1] === 'Default')
            dataMapBuild.set(v[0], pathImageDefault)
        else if (v[0] === 'button-types-logo' && v[1] === 'Fill in automatically')
            continue
        else if (v[0] === 'button-types-logo' && v[1] === 'Use default')
            continue
        else if (v[0] === 'icon_img' && v[1] === 'Default')
            dataMapBuild.set(v[0], pathLogoDefault)
        else if (v[0] === 'scene_title' && v[1] === '100') {
            console.log('scene000 ', v[0])
            dataMapBuild.set(v[0], sceneRokrock)
            dataMapBuild.set('scene_img', sceneRokrockImg)
        } else if (v[0] === 'scene_title' && v[1] === '101') {
            dataMapBuild.set(v[0], sceneTrenchcoat)
            dataMapBuild.set('scene_img', sceneTrenchcoatImg)
        } else if (v[0] === 'scene_title' && v[1] === '102') {
            dataMapBuild.set(v[0], sceneLangrock)
            dataMapBuild.set('scene_img', sceneLangrockImg)
        } else dataMapBuild.set(v[0], v[1])
        if (n == 7)
            dataMapBuild.set(buttonStringKey, buttonStringVal)
        n++
    }
    const dt: ICard = {
        id: Number(dataMapBuild.get('id')),
        title_main: String(dataMapBuild.get('title_main')),
        title_description: String(dataMapBuild.get('title_description')),
        scene_id: String(dataMapBuild.get('scene_title')),
        scene_img: String(dataMapBuild.get('scene_img')),
        image_alt: String(dataMapBuild.get('image_alt')),
        image_background: String(dataMapBuild.get('image_background')),
        icon_alt: String(dataMapBuild.get('icon_alt')),
        icon_img: String(dataMapBuild.get('icon_img')),
        bottom_title: String(dataMapBuild.get('bottom_title')),
        bottom_description: String(dataMapBuild.get('bottom_description')),
        button_reserve: String(dataMapBuild.get('button_reserve')),
    }
    const wv = await storeEvent(dt).then(r => {
        return keyVal = r?.id; /*return v = r?.id*/
    })

    function createPost() {
        revalidatePath('/?addmodalform=true')
        redirect(`/events`)
    }

    let sv = ''
    savedAddedValKey(sv)
    storeEventKey()
}

export async function fetchAddedValKey(dataVal: string) {
    const response = await keyVal;
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

const eventsDataKey = path.join(process.cwd(), '/src/app/(primary)/database/EventsDataKey.json');

async function storeEventKey() {
    const fileEventsKey = await fs.readFile(eventsDataKey, 'utf8');
    const objectData = JSON.parse(fileEventsKey);
    let v = ''
    let keyValToSave = await savedAddedValKey(v)
    try {
        if (Number(keyValToSave) !== 0) {
            if (objectData.length > 0) {
                while (objectData.length > 0) {
                    objectData.pop()
                }
                const updatedDataKey = JSON.stringify(objectData);
                await fs.writeFile(eventsDataKey, updatedDataKey);
            } else {
                console.log()
            }
            objectData.push(keyValToSave)
            const updatedDataKey = JSON.stringify(objectData);
            await fs.writeFile(eventsDataKey, updatedDataKey);
        } else {
        }
    } catch (error) {
        console.error(error);
    }
}