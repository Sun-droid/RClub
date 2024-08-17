'use server'
import {promises as fs} from 'fs';
import path from 'path';
import 'server-only'

let otherDatadataVal: string
const dataFilePath = path.join(process.cwd(), '/src/app/(primary)/admin/lib/Data2.json');
const localDataFilePaths = path.join(process.cwd(), '/src/app/(primary)/admin/lib/Data1.json');

export async function fetchImagePaths(dataVal: string) {
    const response = await fetch('https://picsum.photos/200');
    dataVal = response.url
    return dataVal
}

//Images are being saved for future dev and decreased API requests
export async function saveImagePaths(sv: string) {
    const jsonData = await fs.readFile(dataFilePath, 'utf8');
    const objectData = JSON.parse(jsonData);
    let v = ""
    let dataVal = ""
    dataVal = await fetchImagePaths(v)
    sv = dataVal
    try {
        if (dataVal.length > 0) {
        } else {
            console.log();
        }
    } catch (error) {
        console.error(error);
    }
    return sv
}


export async function localSavedImagePaths(sv: string) {
    const jsonData = await fs.readFile(localDataFilePaths, 'utf8');
    const objectData = JSON.parse(jsonData);
    let v = ""
    let dataVal = ""
    dataVal = objectData[Math.floor(Math.random() * objectData.length)]
    sv = dataVal
    try {
        if (dataVal.length > 0) {
        } else {
            console.log();
        }
    } catch (error) {
        console.error(error);
    }
    return sv
}