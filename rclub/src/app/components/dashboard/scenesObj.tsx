import {ButtonProps} from '@/app/types/types';

//onClick:autoFillAid
const scenesOpt: ButtonProps[] = [
    {
        id: 100,
        selected: false,
        title: 'Rokrock',
        background: './images/rokrock.png',
        backgroundAltText: 'Rokrock lights',
        cb: (idx) => console.log(idx),
        seats: 250
    },
    {
        id: 101,
        selected: false,
        title: 'Trenchcoat',
        background: './images/trenchcoat.png',
        backgroundAltText: 'Trenchcoat lights',
        cb: (idx) => console.log(idx),
        seats: 500
    },
    {
        id: 102,
        selected: false,
        title: 'Langrock',
        background: './images/langrock.png',
        backgroundAltText: 'Langrock lights',
        cb: (idx) => console.log(idx),
        seats: 700
    }
]

export default scenesOpt
