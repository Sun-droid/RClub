'use client'

import {useFormStatus} from 'react-dom'
import {useState} from "react";
import RadioButtonGroup from "./radioButtonGroup";
import {saveImagePaths} from '@/app/(primary)/admin/lib/actionauto';
import {IOption} from "@/app/components/dashboard/InputInterface";
import React from "react";
import {ButtonProps} from '@/app/types/types';
import {Image} from "@nextui-org/react";

//Recording state values for one group of buttons - Image
const autooptionsImage = [
    {
        label: "Fill in automatically",
        name: "button-types-image",
        extra: {
            "a": {variable: "some value", selected: false}
        }
    },
    {
        label: "Use default",
        name: "button-types-image",
        extra: {
            //Setting variable value for default Image
            "a": {variable: "UseDefaultVarImage", selected: false}
        }
    },
];
//Recording state values for one group of buttons - Logo
const autooptionsLogo = [
    {
        label: "Fill in automatically",
        name: "button-types-logo",
        extra: {
            "a": {variable: "some value", selected: false}
        }
    },
    {
        label: "Use default",
        name: "button-types-logo",
        extra: {
            //Setting variable value for default logo
            "a": {variable: "UseDefaultVarLogo", selected: false}
        }
    },
];
const checked_option: boolean = false

export function ButtonAdd() {
    const {pending} = useFormStatus()
    return (
        <button className="mt-4 w-full h-9 bg-amber-900" type="submit" disabled={pending}>
            <p className="text-white">Add event</p>
        </button>
    )
}

export function ButtonOptionAuto() {
    const {pending} = useFormStatus()
    return (
        <div className="w-full h-9">
            <input type="radio" id="radio-button"/>
            <label className="mt-4 w-full h-9 pl-2" htmlFor="radio-button">Fill in automatically</label>
        </div>
    )
}

type Props = {
    pathTypeValue?: string;
};

export const PathFilters = ({
                                pathTypeValue,
                            }: Props) => null;


let count: number = 0
let v
let ck = false

type Param = {
    onStateChange: (arg0: string, arg1: boolean) => void
    caller: string
}

let disable_opt_image: (String | undefined) = ""

export function ButtonOptionAutoRadioImage(onStateChange: Param) {
    const [pathType, setPathType] = useState<undefined | string>('');
    const [selectedValue, setSelectedValue] = useState<String>(); // Here last to undefined.
    const [autooptions, setAutoOptions] = useState<IOption[]>(autooptionsImage);
    let pathreturned: string

    function radioGroupHandlerImage(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedValue(event.target.value);
    }

    async function radioGroupClickHandlerImage(event: React.MouseEvent<HTMLInputElement>) {
        const clicked_value_image = event.currentTarget.attributes.item(0)?.value
        let disableField = false
        if (disable_opt_image !== clicked_value_image && clicked_value_image !== 'radio-option-Usedefault-UseDefaultVarImage') {
            disable_opt_image = clicked_value_image
            let t = ""
            v = await saveImagePaths(t)
            ck = true
            pathreturned = v
            await t01(true)
            setPathType(v);
            disableField = true
            onStateChange.onStateChange(v, disableField)
        } else {
            if (clicked_value_image !== 'radio-option-Usedefault-UseDefaultVarImage') {
                disable_opt_image = ""
                event.currentTarget.checked = false
                onStateChange.onStateChange('', false)
            } else if (clicked_value_image === 'radio-option-Usedefault-UseDefaultVarImage' && disable_opt_image !== 'radio-option-Usedefault-UseDefaultVarImage') {
                let defaultpath = false
                defaultpath = clicked_value_image === 'radio-option-Usedefault-UseDefaultVarImage';
                disable_opt_image = event.currentTarget.attributes.item(0)?.value
                disableField = true
                setPathType('Using default');
                onStateChange.onStateChange('Default', disableField)
            } else {
                setSelectedValue(undefined);
                event.currentTarget.checked = false
                disable_opt_image = ""
                setPathType("");
                onStateChange.onStateChange('', false)
            }
        }
    }

    const inputElement = React.useRef()
    return (
        <div>
            <RadioButtonGroup
                label=""
                options={autooptionsImage}
                onChange={radioGroupHandlerImage}
                onClick={radioGroupClickHandlerImage}
            />
        </div>
    )
}

let disable_opt_logo: (String | undefined) = ""

export function ButtonOptionAutoRadioLogo(onStateChange: Param) {
    const [pathType, setPathType] = useState<undefined | string>('');
    const [selectedValue, setSelectedValue] = useState<String>(); // Here last to undefined.
    const [autooptions, setAutoOptions] = useState<IOption[]>(autooptionsLogo);
    let pathreturned: string

    function radioGroupHandlerLogo(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedValue(event.target.value);
    }

    async function radioGroupClickHandlerLogo(event: React.MouseEvent<HTMLInputElement>) {
        const clicked_value_logo = event.currentTarget.attributes.item(0)?.value
        let disableField = false
        if (disable_opt_logo !== clicked_value_logo && clicked_value_logo !== 'radio-option-Usedefault-UseDefaultVarLogo') {
            disable_opt_logo = clicked_value_logo
            let t = ""
            v = await saveImagePaths(t)
            ck = true
            pathreturned = v
            await t01(true)
            setPathType(v);
            disableField = true
            onStateChange.onStateChange(v, disableField)
        } else {
            if (clicked_value_logo !== 'radio-option-Usedefault-UseDefaultVarLogo') {
                disable_opt_logo = ""
                event.currentTarget.checked = false
                onStateChange.onStateChange('', false)
            } else if (clicked_value_logo === 'radio-option-Usedefault-UseDefaultVarLogo' && disable_opt_logo !== 'radio-option-Usedefault-UseDefaultVarLogo') {
                let defaultpath = false
                defaultpath = clicked_value_logo === 'radio-option-Usedefault-UseDefaultVarLogo';
                disable_opt_logo = event.currentTarget.attributes.item(0)?.value
                disableField = true
                setPathType('Using default');
                onStateChange.onStateChange('Default', disableField)
            } else {
                setSelectedValue(undefined);
                event.currentTarget.checked = false
                disable_opt_logo = ""
                setPathType("");
                onStateChange.onStateChange('', false)
            }
        }
    }

    return (
        <div>
            <RadioButtonGroup
                label=""
                options={autooptionsLogo}
                onChange={radioGroupHandlerLogo}
                onClick={radioGroupClickHandlerLogo}
            />
        </div>
    )
}

export async function t01(t02: boolean) {
    let t03 = false
    if (t02) {
        t03 = t02
    }
    if (!t02 && t03) {
        t02 = true
        t03 = false
        return t02
    } else return t02
}

export function ButtonOptionDefault() {
    const {pending} = useFormStatus()
    return (
        <button className="mt-4 w-full h-9 bg-amber-900" type="submit" disabled={pending}>
            <p className="text-white">Add event</p>
        </button>
    )
}

export function ButtonScene(props: ButtonProps) {
    const buttonNameIn = props.title
    const seats = props.seats
    return (
        <div className={`${props.className} flex-1`}>
            <button
                className={`w-24 h-24 m-2 rounded-full ... relative ... ${props.className === 'active' ? "" : "blur-sm"}`}
                type='button' onClick={props.onClick}/*type="submit"*/ /*disabled={pending}*/>
                <div className="flex flex-grow gap-2 items-center /*blur-sm*/">
                    <Image
                        alt={props.backgroundAltText}
                        src={props.background}
                    />
                </div>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ... font-thin text-lg text-white">
                    <p id="t02a"
                       className={`align-middle text-white font-thin text-lg ${props.className === 'active' ? "text-3xl" : ""}`}>{buttonNameIn}</p>
                    <div
                        className={`text-white h-12 w-12 mx-auto place-content-center rounded-full ... ${props.className === 'active' ? "text-2xl text-amber-900 bg-amber-500 " : ""}`}>
                        <p>on</p>
                    </div>
                </div>
            </button>
            <div className="z-10 font-thin text-lg text-white text-center">
                <p id="t02b"
                   className={` text-white font-thin text-lg ${props.className === 'active' ? "text-3xl" : ""}`}>Seats {seats}</p>
            </div>
        </div>
    )
}