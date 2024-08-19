import { ICard } from "../types/types";

export default function convertObjectToICard(obj: any): ICard {
    const card: ICard = {
        id: obj.id,
        title_main: obj.title_main,
        title_description: obj.title_description,
        scene_id: obj.scene_id,
        scene_img: obj.scene_img,
        image_alt: obj.image_alt,
        image_background: obj.image_background,
        icon_alt: obj.icon_alt,
        icon_img: obj.icon_img,
        bottom_title: obj.bottom_title,
        bottom_description: obj.bottom_description,
        button_reserve: obj.button_reserve,
        delete: undefined
    };
    // If needed to convert booked_count from any to number
    if (obj.booked_count !== undefined) {
        card.booked_count = parseInt(obj.booked_count);
    }
    return card;
}