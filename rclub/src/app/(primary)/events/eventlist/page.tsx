//import {promises as fs} from "fs";
//import fs from "fs";
import {promises as fs} from "fs";
import Card from "@/app/components/card";
import AddedModal from "@/app/components/addedmodal";
import {ICard} from "@/app/types/types";
import path from "path";
import {auth} from '@/auth'
import {kv} from '@vercel/kv';

let c = 0;
export default async function Page() {
    const session = await auth()

    try {
        //Server render
//        const fileDefault = await fs.readFile(path.join(
//                process.cwd(), "/src/app/(primary)/events/srcFiles/DefaultCard.json",
//            ), "utf8"
//        );
//
//        const fileByAdmin = await fs.readFile(path.join(
//                process.cwd(), "/src/app/(primary)/database/EventsData1.json",
//            ), "utf8"
//        );

//        const dataDefault = JSON.parse(fileDefault);
//        const dataByAdmin = JSON.parse(fileByAdmin);

//        const dataProp = dataDefault.array_elem[0];
//        const dataProp1 = dataByAdmin.array_elem[1];

//        let eventsInitial = await kv.get<ICard[]>('events') || []

//        if (!eventsInitial) {
//            await kv.set('events', dataByAdmin.array_elem);
//            // Store the entire array in Vercel KV
//            console.log('Initial data imported successfully');
//        }

        //Overriding on every render
//        await kv.set('events_default', dataDefault.array_elem[0]);

        // Fetch events from Vercel KV
        const events: ICard[] = await kv.get('events') || [];
        const dataProp: ICard = await kv.get('events_default') || defArray;

        const eventList = [];
//        const e = Object.keys(dataByAdmin.array_elem);

//        const itemsToRender = dataByAdmin.array_elem.filter((n: ICard) => n.deleted !== true).length
        const itemsToRender = events.filter((n: ICard) => n.deleted !== true).length
//        const itemsTotal = Object.keys(dataByAdmin.array_elem).length
        const itemsTotal = events.length
//    If there are objects and if they can be rendered with property deleted undefined or false
        if (itemsTotal >= 1 && itemsToRender >= 1) {
//            const ao = dataByAdmin.array_elem;
//            const ao = events;

            //Checking if/what exists in KV
            //console.log("await kv.get('lastAddedEventId')", await kv.get('lastAddedEventId')); //null
            //console.log("await kv.dbsize()", await kv.dbsize()); //null
            //console.log("await kv.keys('')", await kv.keys('')); //null
            //console.log("await eventKey", await kv.get('eventKey')); //null
            let v = "";
            let modal = true;

//            let addedLast = await storedEventKey(v);
            let addedLast = await kv.get('eventKey');
            let eventKey = await kv.get('eventKey') // Using the above addedLast instead

            //Dev only
            let x = 0

            const listItems = events.filter((aox: ICard) => aox.deleted !== true).map((aox: ICard) => (
                <div className={`my-8 relative ${x++}`} key={aox.id}>
                    <Card key={aox.id} dataProp={aox} reserveButton={true} renderAdminColumn={true}
                          session={session}/>
                    {modal && aox.id === Number(addedLast) && <AddedModal/>}
                </div>
            ));
            listItems.sort((a: any, b: any) => b.key - a.key);
            return (
                <div>
                    {listItems}
                </div>
            );
        } else {
            return (
                //Future, add props to Card to unable reservations for Default. Add different information for users when displaying Default
                <div>
                    <div className="bg-amber-500 text-center text-amber-900"><h1> Default Event</h1></div>
                    <Card dataProp={dataProp} reserveButton={true} renderAdminColumn={false} session={session}/>
                </div>
            );
        }
    } catch
        (error) {
        console.error('Error importing initial data:', error);
    }
}


//Minor things to dev
//For render, see also same info for requests in formData submit file in admin/lib/addforvalidate

//  Review
//  Deleting last will create a default active
//  If default and then add new, an empty object is kept and causes hinder for its deletion


//example:
//
//{
//    "array_elem": [
//      {}, // empty obj still rendered
//      {
//        "id": 20240818212313,
//        "title_main": "Friday Corner",
//        "title_description": "Event description...",
//        "scene_id": "Rokrock",
//        "scene_img": "./images/rokrock.png",
//        "image_alt": "Hills and lakes",
//        "image_background": "./images/card-example-5.jpeg",
//        "icon_alt": "Company logo",
//        "icon_img": "./images/breathing-app-icon.jpeg",
//        "bottom_title": "Price here?",
//        "bottom_description": "More on price",
//        "button_reserve": "Reserve",
//        "deleted": true
//      }
//    ]
//  }


//Empty list or one item list displays only the default. The EventsData1.json starts to be rendered after second 'add new'
//changed to 1 in line above in this file (if (Object.keys(dataByAdmin.array_elem).length >= 1) {). Perhaps a warning or info for the admin that there are soft deleted items


const defArray: ICard = {
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
