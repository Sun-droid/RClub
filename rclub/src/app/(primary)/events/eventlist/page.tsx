import {promises as fs} from "fs";
import Card from "@/app/components/card";
import AddedModal from "@/app/components/addedmodal";
import {ICard} from "@/app/types/types";
import path from "path";

let c = 0;
export default async function Page() {
    const fileDefault = await fs.readFile(
        process.cwd() + "/src/app/(primary)/events/src-files/DefaultCard.json",
        "utf8"
    );
    const fileByAdmin = await fs.readFile(
        process.cwd() + "/src/app/(primary)/database/EventsData1.json",
        "utf8"
    );
    const dataDefault = JSON.parse(fileDefault);
    const dataByAdmin = JSON.parse(fileByAdmin);

    const dataProp = dataDefault.array_elem[0];
    const dataProp1 = dataByAdmin.array_elem[1];

    const eventList = [];
    const e = Object.keys(dataByAdmin.array_elem);

    const itemsToRender = dataByAdmin.array_elem.filter((n: ICard) => n.deleted !== true).length
    const itemsTotal = Object.keys(dataByAdmin.array_elem).length
//    If there are objects and if they can be rendered with property deleted undefined or false
    if (itemsTotal >= 1 && itemsToRender >= 1) {
        console.log(" Object.keys(dataByAdmin.array_ele in", itemsToRender)
        const ao = dataByAdmin.array_elem;

        let v = "";
        let modal = true;

        let addedLast = await storedEventKey(v);
//Dev only
        let x = 0
        const listItems = ao.filter((aox: ICard) => aox.deleted !== true).map((aox: ICard) => (
            <div className={`my-8 relative ${x++}`} key={aox.id}>
                <Card key={aox.id} dataProp={aox} reserveButton={true} renderAdminColumn={true}/>
                {modal && aox.id === Number(addedLast) && <AddedModal/>}
            </div>
        ));
        listItems.sort((a: any, b: any) => b.key - a.key);

        return (
            <div>
                {listItems}
                {/*{listItems1}*/}
            </div>
        );
    } else {
        return (
            //Future, add props to Card to unable reservations for Default. Add different information for users when displaying Default
            <div>
                <div className="bg-amber-500 text-center text-amber-900"><h1> Default Event</h1></div>
                <Card dataProp={dataProp} reserveButton={true} renderAdminColumn={false}/>
            </div>
        );
    }
}

const eventsDataKey = path.join(
    process.cwd(),
    "/src/app/(primary)/database/EventsDataKey.json"
);

async function storedEventKey(s: string) {
    const fileEventsKey = await fs.readFile(eventsDataKey, "utf8");
    const objectData = JSON.parse(fileEventsKey);
    let v = "";

    s = objectData[0];

    return s;
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