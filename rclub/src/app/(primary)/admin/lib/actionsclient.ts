'use client'

export async function addImageFilePath() {
    const response = await fetch('https://picsum.photos/200');
    let dataVal = response.url
    return dataVal
}