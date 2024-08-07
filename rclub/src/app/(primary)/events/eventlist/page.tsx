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

    if (Object.keys(dataByAdmin.array_elem).length >= 2) {
        const ao = dataByAdmin.array_elem;

        let v = "";
        let modal = true;

        let addedLast = await storedEventKey(v);


        const listItems = ao.map((aox: ICard) => (
            <div className="my-8 relative ..." key={aox.id}>
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
            <div>
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
  