'use server'
import {promises as fs} from 'fs';
import path from 'path';
import 'server-only'
import {kv} from '@vercel/kv';

let otherDatadataVal: string
//const dataFilePath = path.join(process.cwd(), '/src/app/(primary)/admin/lib/Data2.json');
//const localDataFilePaths = path.join(process.cwd(), '/src/app/(primary)/admin/lib/Data1.json');


//const dataFilePath = await fs.readFile(path.join(
//        process.cwd(), '/src/app/(primary)/admin/lib/Data2.json',
//    ), 'utf8'
//);
//
//const localDataFilePaths = await fs.readFile(path.join(
//        process.cwd(), '/src/app/(primary)/admin/lib/Data1.json',
//    ), 'utf8'
//);


export async function fetchImagePaths(dataVal: string) {
    const response = await fetch('https://picsum.photos/200');
    dataVal = response.url
    return dataVal
}

//Paused -use only in dev mode, in local files
//Images are being saved for future dev and decreased API requests
export async function saveImagePaths(sv: string) {
//    const jsonData = await fs.readFile(dataFilePath, 'utf8');

    const jsonData = await fs.readFile(path.join(
            process.cwd(), '/src/app/(primary)/admin/lib/Data2.json',
        ), 'utf8'
    );


//const fileUserJsonPath = path.join(process.cwd(), '/src/app/lib/data/users.json');
//const fileUserJson = await fs.readFile(fileUserJsonPath, 'utf8')




//    Pausing this feature since there are enought paths to fetch, locally.
//    Vercel works fetching/reading from the local Json.
//    Use KV if needs to write
    const objectData = JSON.parse(jsonData);
    let v = ""
    let dataVal = ""
    dataVal = await fetchImagePaths(v)
    sv = dataVal
    try {
        if (dataVal.length > 0) {
            await kv.set('imagePaths', dataVal)
//            sv= await kv.get('imagePaths') // needs to get one item only
        } else {
            console.log('No image paths found');
        }
    } catch (error) {
        console.error(error);
    }
    return dataVal
}

export async function localSavedImagePaths(sv: string) {
//    const jsonData = await fs.readFile(localDataFilePaths, 'utf8');
//    const jsonData = await fs.readFile(path.join(
//            process.cwd(), '/src/app/(primary)/admin/lib/Data1.json',
//        ), 'utf8'
//    );
//    const objectData = JSON.parse(jsonData);
    //Loading the base data
//    await kv.set('imagePaths', objectData);
    const imagePaths = await kv.get<string[]>('imagePaths') || [];


    let v = ""
    let dataVal = ""
//    dataVal = objectData[Math.floor(Math.random() * objectData.length)]
    dataVal = imagePaths[Math.floor(Math.random() * imagePaths.length)]
    console.log("imagePaths local dataVal", dataVal )
    sv = dataVal
    try {
        if (dataVal.length > 0) {
        } else {
            console.log('Empty', dataVal.length);
        }
    } catch (error) {
        console.error(error);
    }
    return sv
}