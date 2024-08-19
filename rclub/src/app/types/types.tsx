export interface Posts {
    id: string;
    title: string;
    description: string;
    content: string;
    created_at?: string;
}

export const posts: Posts [] = [
    {
        id: '1',
        title: 'React Router',
        description: 'A library that helps manage state',
        content: 'anyCont',
        created_at: 'any other ',
    }, {
        id: '2',
        title: 'React Router 2',
        description: 'A library that helps manage state',
        content: 'anyCont',
        created_at: 'any other ',
    },
];

// ICard is an event/concert model. This is also used as model for other components - Reserve, Ticket print ... 
//    delete?: any;
export interface ICard {
    id: number
    title_main: string
    title_description: string
    scene_id: string
    scene_img: string
    image_alt: string
    image_background: string
    icon_alt: string
    icon_img: string
    bottom_title: string
    bottom_description: string
    button_reserve: string
    booked_count?: number
    deleted?: boolean
}

export interface IScene {
    id: number
    title_main: string
    seats_reserved?: number
    seats_free?: boolean
}

export interface IProps {
    dataProp: ICard | undefined
    fn?: (dataProp: ICard) => void;
}

export type Props = {
    session?: any;
    dataProp: ICard;
    reserveButton?: boolean;
    renderAdminColumn?: boolean;
};

export interface ITooltip {
    content: string;
    children?: JSX.Element | JSX.Element[];
    disabled: boolean;
    init_enabled?: boolean;
}

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

export interface ButtonProps {
    id?: number,
    className?: string,
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    styles?: string;
    type?: ButtonType;
    title?: string;
    disabled?: boolean;
    selected?: boolean;
    background?: string;
    backgroundAltText?: string;
    cb: (idx: number) => void;
    seats?: number
}

export interface IPerson {
    id: number
    person_name: string
    person_email: string
    person_phone: number
    person_membership?: boolean
    person_logged_in?: boolean
}

export interface ITicket {
    id: number
    person_id: number
    //Temporary option - Future - create interface for nested level
    //Start
    event_id: string
    image_background: string
    scene_id: string
    scene_img: string
    //End
    price?: number
    date?: string
    discount?: boolean
}

export interface IReservation {
    id: number
    holder: IPerson
    object_reserved: ITicket
    date?: string
    cancelled?: boolean
    refundable?: boolean
}

export interface Booking {
    id?: number;
    event_id?: number;
    date?: string;
    name?: string;
    email?: string;
}

// This will hold the count of booked items
export interface IBookedCount {
    bookedCount: number;
}

