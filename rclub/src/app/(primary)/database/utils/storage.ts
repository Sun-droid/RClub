import {ICard, IReservation} from '@/app/types/types';
import {kv} from '@vercel/kv';
import fs from 'fs/promises';
import path from 'path';


//Note
//Data handling files 
//1 & 2, src/app/(primary)/events/eventlist/page.tsx
//3, src/app/(primary)/events/reserve/addformvalidate.ts
//4, src/app/(primary)/admin/lib/actionauto.ts
//1 & 2, src/app/(primary)/admin/lib/addformvalidate.ts
//3, src/app/api/route.ts

//Using - const fileUserJson = await fs.readFile(process.cwd() + '/src/app/lib/data/users.json', 'utf8'); in
//src/app/(primary)/admin/lib/addformvalidate.ts 

//Script runs once to populate the Vercel KV with the initial data from JSON files
async function importInitialData() {
    try {
//1 & 2 //For src/app/(primary)/events/eventlist/page.tsx
        // Import event data
        const eventsPathDefault = path.join(process.cwd(), '/src/app/(primary)/events/srcFiles/DefaultCard.json');
        const eventsDataDefault = JSON.parse(await fs.readFile(eventsPathDefault, 'utf8'));
        const eventsPath = path.join(process.cwd(), '/src/app/(primary)/database/EventsData1.json');
        const eventsData = JSON.parse(await fs.readFile(eventsPath, 'utf8'));

        let eventsInitialDefault = await kv.get<ICard[]>('events') || []
        let eventsInitial = await kv.get<ICard[]>('events') || []
//1
        if (!eventsInitial)
            await kv.set('events_default', eventsDataDefault.array_elem[0]);
//2
        if (!eventsInitialDefault)
            await kv.set('events', eventsData.array_elem);


//3     //For src/app/(primary)/events/reserve/addformvalidate.ts
        // Import reservations
        const reservationsPath = path.join(process.cwd(), '/src/app/(primary)/database/ReserveObject.json');
        const reservationsData = JSON.parse(await fs.readFile(reservationsPath, 'utf8'));

        let reservations = await kv.get<IReservation[]>('reservations') || []

        if (!reservations)
            await kv.set('reservations', reservationsData);

//4     //For src/app/(primary)/admin/lib/actionauto.ts
        // Import image paths
        const imagePathsPath = path.join(process.cwd(), '/src/app/(primary)/admin/lib/Data1.json');
        const imagePathsLocal = JSON.parse(await fs.readFile(imagePathsPath, 'utf8'));
        const imagePaths = await kv.get<string[]>('imagePaths') || [];

        if (!imagePaths)
            await kv.set('imagePaths', imagePathsLocal);


        console.log('Initial data imported successfully');
    } catch (error) {
        console.error('Error importing initial data:', error);
    }
}

importInitialData();