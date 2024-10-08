'use client'
//On this file : Complex inputs like scenes, images, and logos
import {useFormStatus} from 'react-dom'
import {useEffect, useState} from "react";
import RadioButtonGroup from "./radioButtonGroup";
import {saveImagePaths, localSavedImagePaths} from '@/app/(primary)/admin/lib/actionauto';
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
            "a": {variable: "UseFillInAuto", selected: false}
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
            "a": {variable: "UseFillInAuto", selected: false}
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
    updateObj: string | null
    isInputFilled: boolean | null
    isFormOpen: boolean | null
}

let disable_opt_image: (string | undefined) = ""

export function ButtonOptionAutoRadioImage(onStateChange: Param) {
    const [pathType, setPathType] = useState<null | string>('');
    const [selectedValue, setSelectedValue] = useState<string>(); // Here last to undefined.
    const [autooptions, setAutoOptions] = useState<IOption[]>(autooptionsImage);
    let pathreturned: string
    const updateObj = onStateChange.updateObj

    const [autoFill, setAutoFill] = useState<null | boolean>(false);
    const [clickUseDefault, setClickUseDefault] = useState<null | boolean>(true);
    const [clickUseAuto, setClickUseAuto] = useState<null | boolean>(true);
    const [useDefault, setUseDefault] = useState<null | boolean>(false);
    const [autoFillPath, setAutoFillPath] = useState<string>('');
    const [radioSelectedDefault, setRadioSelectedDefault] = useState<boolean | null>(false);
    const [radioSelectedAuto, setRadioSelectedAuto] = useState<boolean | null>(false);
    const [updateNewLink, setUpdateNewLink] = useState<boolean | null>(false);

    useEffect(() => {

        if (updateObj) {
            if (updateObj === './images/card-example-5.jpeg' || updateObj.startsWith('./images/')) {
                setUseDefault(true)
                setSelectedValue('radio-option-Usedefault-UseDefaultVarImage');
            } else if (updateObj.startsWith('https://fastly.picsum.photos/id/')) {
                setAutoFill(true)
                setAutoFillPath(updateObj)
                setSelectedValue('radio-option-Fillinautomatically-UseFillInAuto');
            } else
                setSelectedValue('')
        }
    }, [updateObj]);
    const [userClick, setUserClick] = useState<null | boolean>(false);
    useEffect(() => {
            if (autoFill && selectedValue && clickUseAuto) {
                disable_opt_image = ''
                setRadioSelectedAuto(true)
                onStateChange.onStateChange(autoFillPath, true);
            }

            if (useDefault && selectedValue && clickUseDefault) {
                setRadioSelectedDefault(true)
                onStateChange.onStateChange('Default', true);
            }
        }, [autoFill, autoFillPath, clickUseAuto, clickUseDefault, onStateChange, selectedValue, useDefault, userClick]
    )


    function radioGroupHandlerImage(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedValue(event.target.value);
    }

    async function radioGroupClickHandlerImage(event: React.MouseEvent<HTMLInputElement>) {
        if (selectedValue) {
            setSelectedValue('')
            setClickUseDefault(false)
            onStateChange.onStateChange('', false)
        }

//      First value never recorded if it comes from update form which uses useEffect to fill up the form - reading the checked
//      value is unknown, this means that the first value is mistankely recorded as from unchecked to chekecd
        const clicked_value_image = event.currentTarget.attributes.item(0)?.value //"radio-option-Fillinautomatically-some value" "radio-option-Usedefault-UseDefaultVarImage"

        let disableField = false

        if (disable_opt_image !== clicked_value_image && clicked_value_image !== 'radio-option-Usedefault-UseDefaultVarImage') {
            setClickUseDefault(false)
            setClickUseAuto(true)
            setSelectedValue('')
            disable_opt_image = clicked_value_image
            let t = ""

            if (!updateObj)
                v = await saveImagePaths(t)
            else if (autoFillPath) {
                v = autoFillPath
            } else {
                v = await localSavedImagePaths(t)
                setUpdateNewLink(true)
                onStateChange.onStateChange(v, true)
            }

            ck = true
            pathreturned = v
            await t01(true)
            setPathType(v);
            disableField = true

            if (!selectedValue)
                onStateChange.onStateChange(v, disableField)
//          Needs review 'if (updateObj && updateNewLink) {...'
            if (updateObj && updateNewLink) {
                onStateChange.onStateChange(v, disableField)
                setUpdateNewLink(false)
            }
        } else {
            let updateToDefault = false
            if (clicked_value_image !== 'radio-option-Usedefault-UseDefaultVarImage') {
                disable_opt_image = ""
                event.currentTarget.checked = false
                onStateChange.onStateChange('', false)
            } else if (clicked_value_image === 'radio-option-Usedefault-UseDefaultVarImage' && disable_opt_image !== 'radio-option-Usedefault-UseDefaultVarImage') {
                if (updateObj) {
                    setClickUseDefault(true)
                    setClickUseAuto(false)
                    updateToDefault = true
                }

                let defaultpath = false
                defaultpath = clicked_value_image === 'radio-option-Usedefault-UseDefaultVarImage';
                disable_opt_image = event.currentTarget.attributes.item(0)?.value
                disableField = true
                setPathType('Using default');

                if (!selectedValue)
                    onStateChange.onStateChange('Default', disableField)

                if (updateObj && !radioSelectedDefault && radioSelectedAuto)
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
                //                label={selectedValue ? selectedValue : "" }
                label=""
                options={autooptionsImage}
                onChange={radioGroupHandlerImage}
                onClick={radioGroupClickHandlerImage}
                value={selectedValue}
            />
        </div>
    )
}

let disable_opt_logo: (string | undefined) = ""

export function ButtonOptionAutoRadioLogo(onStateChange: Param) {
    const [pathType, setPathType] = useState<undefined | string>('');
    const [selectedValue, setSelectedValue] = useState<string>(); // Here last to undefined.
    const [autooptions, setAutoOptions] = useState<IOption[]>(autooptionsLogo);
    let pathreturned: string
    const updateObj = onStateChange.updateObj

    const [autoFill, setAutoFill] = useState<null | boolean>(false);
    const [clickUseDefault, setClickUseDefault] = useState<null | boolean>(true);
    const [clickUseAuto, setClickUseAuto] = useState<null | boolean>(true);
    const [useDefault, setUseDefault] = useState<null | boolean>(false);
    const [autoFillPath, setAutoFillPath] = useState<string>('');
    const [radioSelectedDefault, setRadioSelectedDefault] = useState<boolean | null>(false);
    const [radioSelectedAuto, setRadioSelectedAuto] = useState<boolean | null>(false);
    const [updateNewLink, setUpdateNewLink] = useState<boolean | null>(false);

    useEffect(() => {
        if (updateObj) {
            if (updateObj === './images/breathing-app-icon.jpeg' || updateObj.startsWith('./images/')) {
                setUseDefault(true)
                setSelectedValue('radio-option-Usedefault-UseDefaultVarLogo');
            } else if (updateObj.startsWith('https://fastly.picsum.photos/id/')) {
                setAutoFill(true)
                setAutoFillPath(updateObj)
                setSelectedValue('radio-option-Fillinautomatically-UseFillInAuto');
            } else
                setSelectedValue('')
        }
    }, [updateObj]);

    const [userClick, setUserClick] = useState<null | boolean>(false);
    useEffect(() => {
            if (autoFill && selectedValue && clickUseAuto) {
                disable_opt_logo = ''
                setRadioSelectedAuto(true)
                onStateChange.onStateChange(autoFillPath, true);
            }

            if (useDefault && selectedValue && clickUseDefault) {
                setRadioSelectedDefault(true)
                onStateChange.onStateChange('Default', true);
            }
        }, [autoFill, autoFillPath, clickUseAuto, clickUseDefault, onStateChange, selectedValue, useDefault, userClick]
    )

    function radioGroupHandlerLogo(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedValue(event.target.value);
    }

    async function radioGroupClickHandlerLogo(event: React.MouseEvent<HTMLInputElement>) {
        if (selectedValue) {
            setSelectedValue('')
            setClickUseDefault(false)
            onStateChange.onStateChange('', false)
        }

        const clicked_value_logo = event.currentTarget.attributes.item(0)?.value
        let disableField = false
        if (disable_opt_logo !== clicked_value_logo && clicked_value_logo !== 'radio-option-Usedefault-UseDefaultVarLogo') {
            setClickUseDefault(false)
            setClickUseAuto(true)
            setSelectedValue('')
            disable_opt_logo = clicked_value_logo
            let t = ""

//            v = await saveImagePaths(t)
            if (!updateObj)
                v = await saveImagePaths(t)
            else if (autoFillPath) {
                v = autoFillPath
            } else {
                v = await localSavedImagePaths(t)
                setUpdateNewLink(true)
                onStateChange.onStateChange(v, true)
            }
            ck = true
            pathreturned = v
            await t01(true)
            setPathType(v);
            disableField = true
//            onStateChange.onStateChange(v, disableField)
            if (!selectedValue)
                onStateChange.onStateChange(v, disableField)
//          Needs review 'if (updateObj && updateNewLink) {...'
            if (updateObj && updateNewLink) {
                onStateChange.onStateChange(v, disableField)
                setUpdateNewLink(false)
            }
        } else {
            let updateToDefault = false
            if (clicked_value_logo !== 'radio-option-Usedefault-UseDefaultVarLogo') {
                disable_opt_logo = ""
                event.currentTarget.checked = false
                onStateChange.onStateChange('', false)
            } else if (clicked_value_logo === 'radio-option-Usedefault-UseDefaultVarLogo' && disable_opt_logo !== 'radio-option-Usedefault-UseDefaultVarLogo') {
                if (updateObj) {
                    setClickUseDefault(true)
                    setClickUseAuto(false)
                    updateToDefault = true
                }

                let defaultpath = false
                defaultpath = clicked_value_logo === 'radio-option-Usedefault-UseDefaultVarLogo';
                disable_opt_logo = event.currentTarget.attributes.item(0)?.value
                disableField = true
                setPathType('Using default');
//                onStateChange.onStateChange('Default', disableField)
                if (!selectedValue)
                    onStateChange.onStateChange('Default', disableField)

                if (updateObj && !radioSelectedDefault && radioSelectedAuto)
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
                value={selectedValue}
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