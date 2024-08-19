'use client'

import {lusitana} from '@/app/ui/fonts';
import {ExclamationCircleIcon, MusicalNoteIcon, PencilIcon} from '@heroicons/react/24/outline';
import {ButtonSubmit} from '@/app/ui/button';
import {ButtonFill} from './buttonfill';
import {ButtonOptionAutoRadioImage, ButtonOptionAutoRadioLogo} from './../buttons';
import {useFormState} from 'react-dom';
import {addToDataFile, updateDataFile} from '@/app/(primary)/admin/lib/actions';
import {addImageFilePath} from '@/app/(primary)/admin/lib/actionsclient';
import Link from 'next/link';
import {useState, useEffect, useRef, useCallback} from 'react';
import Tooltip from "@/app/components/tooltip";
import useTimeout from "@/app/components/useTimeout";
import React from "react";
import ScenesButtonOptGroup from '@/app/components/dashboard/scenesButtonOptGroup';
import convertObjectToICard from '@/app/components/convertObjectToICard';
import scenesOpt from '@/app/components/dashboard/scenesObj';

import {useSearchParams} from 'next/navigation'
import {ICard} from '@/app/types/types'

export default function AddEventForm() {
//    Is update
    const [itemGetObj, setItemGetObj] = useState<ICard | null>(null);
    const searchParams = useSearchParams();
    const [updateObjImg, setUpdateObjImg] = useState<null | string>('');
    const [updateObjLogo, setUpdateObjLogo] = useState<null | string>('');

//    Is new
    // State to track mode (add/update)
    const [isAddModeNewItem, setIsAddModeNewItem] = useState(true);
//    const [errorMessage, dispatch] = useFormState(addToDataFile, undefined);
    const [errorMessage, dispatch] = useFormState(itemGetObj ? updateDataFile : addToDataFile, undefined, '');
    const [pathTypeImage, setPathTypeImage] = useState<undefined | string>('');
    const [isInputImgFilled, setIsInputImgFilled] = useState<boolean | null>(false);
    const [pathTypeLogo, setPathTypeLogo] = useState<undefined | string>('');
    const [isInputLogoFilled, setIsInputLogoFilled] = useState<boolean | null>(false);
    const [disabled, setDisabled] = useState(false);
    const [disabledLogo, setDisabledLogo] = useState(false);
    const [runVisibleTooltip, setRunVisibleTooltip] = useState(false);
    const [visibleTooltip, setVisibleTooltip] = useState(false);
    const [autoFill, setAutoFill] = useState(false);
    const [autoFillOff, setAutoFillOff] = useState(true);
//    Autofill
    const [val01, setVal01] = useState<undefined | string>('');
    const [val02, setVal02] = useState<undefined | string>('');
    const [val03, setVal03] = useState<undefined | string>('');
    const [val04, setVal04] = useState<undefined | string>('');
    const [val05, setVal05] = useState<undefined | string>('');
    const [val06, setVal06] = useState<undefined | string>('');
    const [val07, setVal07] = useState<undefined | string>('');
    const [val08, setVal08] = useState<undefined | string>('');
    const [val09, setVal09] = useState<undefined | number>(0);
    const [sceneValSelected, setSceneValSelected] = useState<undefined | number>(100);
    const [sceneValSelectedUI, setSceneValSelectedUI] = useState<null | number>(0);
    addImageFilePath()
    const autooptionsImage = 'autooptionsImage'

    // Check if the parameter addmodalform exists and equals 'true'
    useEffect(() => {
        const isModalAdd = searchParams.get('addmodalform') === 'true';
        if (isModalAdd) {
            const jsonPart: string | null = searchParams.toString().split('addmodalform=true&')[1];
            if (jsonPart) {
                setIsAddModeNewItem(false)
                // Decode URI component and parse the JSON
                const decodedString = decodeURIComponent(jsonPart);
                const cleanJsonPart = decodedString.replace(/=$/, '');
                try {
                    const jsonObject: ICard = JSON.parse(cleanJsonPart);
                    // Replace + with space in string values
//                    Proceed with caution regarding the handling of + symbols. Links and other data might be affected
                    const formattedObject = convertObjectToICard(Object.fromEntries(
                        Object.entries(jsonObject).map(([key, value]) => [
                            key,
                            typeof value === 'string' ? value.replace(/\+/g, ' ') : value
                        ])
                    ));
                    setItemGetObj(formattedObject);
                } catch (error) {
                    console.error('JSON Parse Error:', error);
                }
            } else {
                console.warn('No JSON string found after addmodalform=true&');
            }

        }
    }, [searchParams])

    useEffect(() => {
        if (itemGetObj) {
            // Fetch the data for the item to be updated
            console.log(" itemGetObj", itemGetObj.id)
            const selectedScene = scenesOpt.find((scene) => scene.title === itemGetObj?.scene_id)
            try {
                setVal01(itemGetObj.title_main);
                setVal02(itemGetObj.title_description);
                setVal03(itemGetObj.image_alt);
                setVal05(itemGetObj.icon_alt);
                setVal07(itemGetObj.bottom_title);
                setVal08(itemGetObj.bottom_description);
                setVal09(itemGetObj.id);
                setUpdateObjImg(itemGetObj.image_background);
                setUpdateObjLogo(itemGetObj.icon_img);
                setPathTypeLogo(itemGetObj.icon_img);
                if (selectedScene) {
                    const index = scenesOpt.indexOf(selectedScene);
                    const sceneId = selectedScene.id;
                    setSceneValSelectedUI(index);
                    setSceneValSelected(sceneId);
                }
            } catch (error) {
                console.error("Failed to fetch item data: ", error);
                // Handle error (e.g., error message)
            }
        }
    }, [itemGetObj]);

    const handleStateChangeImage = (value: string, selected: boolean
    ) => {
        if (selected) {
            setDisabled(true)
            setIsInputImgFilled(true)
        } else {
            setDisabled(false)
            setIsInputImgFilled(false)
        }
        setPathTypeImage(value);
    }

    const autooptionsLogo = 'autooptionsLogo'
    const handleStateChangeLogo = (value: string, selected: boolean
    ) => {
        if (selected) {
            setDisabledLogo(true)
            setIsInputLogoFilled(true)
        } else {
            setDisabledLogo(false)
            setIsInputLogoFilled(false)
        }
        setPathTypeLogo(value);
    };
    const AidFill = ["Friday Corner", "Event description...", "Hills and lakes", "Default", "Company logo", "Default", "Price here?", "More on price"]

    let cn = 0
    const autoFillAid = () => {
        const elementImage = document.getElementById('radio-option-Usedefault-UseDefaultVarImage');
        const elementLogo = document.getElementById('radio-option-Usedefault-UseDefaultVarLogo');
        if (!autoFill) {
            setAutoFill(true)
//Warning: State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().
            setAutoFillOff(false)
            //Future - use another approach
            setVal01(AidFill[0])
            setVal02(AidFill[1])
            setVal03(AidFill[2])
            setVal04(AidFill[3])
            setVal05(AidFill[4])
            setVal06(AidFill[5])
            setVal07(AidFill[6])
            setVal08(AidFill[7])
        } else {
            setAutoFill(false)
            setAutoFillOff(true)
            //Future - set/(return to) the last value filled by user
            setVal01('')
            setVal02('')
            setVal03('')
            setVal04('')
            setVal05('')
            setVal06('')
            setVal07('')
            setVal08('')
            if (disabled)
                simulateMouseClick(elementImage);

            if (disabledLogo)
                simulateMouseClick(elementLogo);
        }
    };
    useEffect(() => {
        const elementImage = document.getElementById('radio-option-Usedefault-UseDefaultVarImage');
        const elementLogo = document.getElementById('radio-option-Usedefault-UseDefaultVarLogo');
        if (autoFill) {
            simulateMouseClick(elementImage);
            simulateMouseClick(elementLogo);
        } else
            console.log()
    }, [autoFill])
    const mouseClickEvents = ['mousedown', 'click', 'mouseup'];

    function simulateMouseClick(element: HTMLElement | null) {
        mouseClickEvents.forEach(mouseEventType =>
            element!.dispatchEvent(
                new MouseEvent(mouseEventType, {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    buttons: 1
                })
            )
        );
    }

    let c = 0
    useTimeout(() => setRunVisibleTooltip(true), !runVisibleTooltip ? 4000 : null);
    if (runVisibleTooltip && c === 0) {
        setVisibleTooltip(true)
        setRunVisibleTooltip(false)
        c++;
    }
    useTimeout(() => setVisibleTooltip(false), visibleTooltip ? 3000 : null);

    return (
        <div>
            {/*{itemGetObj && sceneValSelectedUI && (*/}
            <form action={dispatch} className="space-y-3 w-full">
                <div className=" relative flex-1 rounded-lg w-full bg-amber-600 px-6 pb-4 <pt-8></pt-8>">
                    <h1 className={`${lusitana} mb-3 text-2xl text-center text-white`}>
                        About the event.
                    </h1>
                    {!itemGetObj && <div className="absolute ... w-1/3 h-1/6 text-s top-0 right-0 z-30 space-x-2 ">
                        <div className="float-right ... flex items-center">
                            <span className="text-white mr-2.5 h-full">Aid</span>
                            <Tooltip init_enabled={visibleTooltip} disabled={false} content={"Dev tool"}>
                                <ButtonFill onClick={autoFillAid} selected={autoFill}
                                            cb={function (idx: number): void {
                                                throw new Error('Function not implemented.');
                                            }}/>
                            </Tooltip>
                        </div>
                    </div>}
                    <div className="w-full">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="title"
                            >
                                Event title
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="title_main"
                                    type="text"
                                    name="title_main"
                                    placeholder="Event name"
                                    required
                                    value={val01 || ''}
                                    onChange={e => setVal01(e.target.value)}
                                />
                                <MusicalNoteIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="description"
                            >
                                Short description
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="title_description"
                                    type="text"
                                    name="title_description"
                                    placeholder="What is the events about?"
                                    required
                                    value={val02 || ''}
                                    onChange={e => setVal02(e.target.value)}
                                />
                                <PencilIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                        <div
                            className="mb-2 mt-5 block text-xs font-medium text-gray-900" /*htmlFor="imagebackground"*/ >
                            <p className={`${lusitana} text-2xl text-center text-white`}>Scene</p><br/><br/>
                            <div
                                className="bg-gradient-to-r from-amber-700 via-amber-700 to-transparent to-80% border-l-2 border-slate-300 w-full mb-2 text-xs font-medium text-gray-900">
                                <div className="w-full">
                                </div>
                                <div className="sceneButtonInForm">
                                    <ScenesButtonOptGroup data={scenesOpt} ckSceneId={setSceneValSelected}
                                                          sceneSelectionVal={sceneValSelectedUI}/>
                                    <input
                                        className="hidden block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="scene_id"
                                        type="text"
                                        name="scene_title"
                                        required
                                        value={sceneValSelected || ''}
                                        onChange={e => sceneValSelected}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="imagemain"
                            >
                                Image description
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="image_alt"
                                    type="text"
                                    name="image_alt"
                                    placeholder="What is the image showing?"
                                    required
                                    value={val03 || ''}
                                    onChange={e => setVal03(e.target.value)}
                                />
                                <PencilIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                        <div>
                            <div
                                className="mb-2 mt-5 block text-xs font-medium text-gray-900" /*htmlFor="imagebackground"*/ >

                                <p className={`${lusitana} text-2xl text-center text-white`}>Choose one image
                                    option</p>
                                <br/><br/>
                                <div className="grid grid-cols-2 w-full mb-2 text-xs font-medium text-gray-900">
                                    <div
                                        className="bg-gradient-to-l from-amber-700 via-amber-700 to-transparent to-80%">
                                        <p className="text-white text-center">Done manually</p> <br/><br/>
                                        - Paste a web link to an image <br/><br/>
                                        - Choose a <Link className="text-blue-700 font-bold"
                                                         href="https://picsum.photos/200"
                                                         target="_blank">random</Link> image {/*<br/>*/}copy the
                                        link and
                                        paste it<br/> here under <br/><br/>
                                    </div>
                                    <div
                                        className="bg-gradient-to-r from-amber-700 via-amber-700 to-transparent to-80% border-l-2 border-red-900">
                                        <p className="text-white text-center">Done by the application</p> <br/><br/>
                                        <div className="pl-2">
                                            <ButtonOptionAutoRadioImage /*ref={inputElement}*/
                                                onStateChange={handleStateChangeImage} caller={autooptionsImage}
                                                updateObj={updateObjImg} isInputFilled={isInputImgFilled}
                                                isFormOpen={true}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 /*disabled:bg-gray-200 disabled:text-amber-700*/ read-only:bg-gray-200 read-only:text-amber-700"
                                    id="image_background"
                                    type="text"
                                    name="image_background"
                                    placeholder="Link to image"
                                    required
                                    //                              Using pathTypeImage for autofill. This to be able to clear the field and use the disabled func
                                    value={pathTypeImage || ''}
                                    onChange={e => setPathTypeImage(e.target.value)}
                                    readOnly={disabled}
                                />
                                <PencilIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="iconmain"
                            >
                                Icon/logo description
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="icon_alt"
                                    type="text"
                                    name="icon_alt"
                                    placeholder="What is the icon showing?"
                                    required
                                    value={val05 || ''}
                                    onChange={e => setVal05(e.target.value)}
                                />
                                <PencilIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                        <div>
                            <div
                                className="mb-2 mt-5 block text-xs font-medium text-gray-900" /*htmlFor="imagebackground"*/ >
                                <p className={`${lusitana} text-2xl text-center text-white`}>Choose one logotype
                                    option</p>
                                <br/><br/>
                                <div className="grid grid-cols-2 w-full mb-2 text-xs font-medium text-gray-900">
                                    <div
                                        className="bg-gradient-to-l from-amber-700 via-amber-700 to-transparent to-80%">
                                        <p className="text-white text-center">Done manually</p> <br/><br/>
                                        - Paste a web link to an image <br/><br/>
                                        - Choose a <Link className="text-blue-700 font-bold"
                                                         href="https://picsum.photos/200"
                                                         target="_blank">random</Link> image {/*<br/>*/}copy the
                                        link and
                                        paste it<br/> here under <br/><br/>
                                    </div>
                                    <div
                                        className="bg-gradient-to-r from-amber-700 via-amber-700 to-transparent to-80% border-l-2 border-red-900">
                                        <p className="text-white text-center">Done by the application</p> <br/><br/>
                                        <div className="pl-2">
                                            <ButtonOptionAutoRadioLogo onStateChange={handleStateChangeLogo}
                                                                       caller={autooptionsLogo}
                                                                       updateObj={updateObjLogo}
                                                                       isInputFilled={isInputLogoFilled}
                                                                       isFormOpen={true}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 /*disabled:background-gray-200 disabled:text-amber-700*/ read-only:background-gray-200 read-only:text-amber-700"
                                    id="icon_img"
                                    type="text"
                                    name="icon_img"
                                    placeholder="Link to image"
                                    required
                                    value={pathTypeLogo || ''}
                                    onChange={e => setPathTypeLogo(e.target.value)}
                                    readOnly={disabledLogo}
                                />
                                <PencilIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="extratitle"
                            >
                                Bottom title
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="bottom_title"
                                    type="text"
                                    name="bottom_title"
                                    placeholder="Add a closing title"
                                    required
                                    value={val07 || ''}
                                    onChange={e => setVal07(e.target.value)}
                                />
                                <PencilIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="extratitledesc"
                            >
                                Closing title description
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="bottom_description"
                                    type="text"
                                    name="bottom_description"
                                    placeholder="Extra information"
                                    required
                                    value={val08 || ''}
                                    onChange={e => setVal08(e.target.value)}
                                />
                                <PencilIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                            {itemGetObj &&
                                <div className="relative">
                                    <input
                                        className="hidden"
                                        id="object_id"
                                        type="text"
                                        name="object_id"
                                        placeholder="Extra information"
                                        required
                                        value={val09 || ''}
                                        onChange={e => setVal08(e.target.value)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    {/*<ButtonSubmit/>*/}
                    <div className="w-full sm:w-auto">
                        <ButtonSubmit disabled={errorMessage !== null} styleButton="fill bg-amber-900"
                                      icon={<ExclamationCircleIcon className="h-5 w-5 text-white"/>}>
                            {itemGetObj ? "Update event" : "Add event"}
                        </ButtonSubmit>
                    </div>
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-900"/>
                                <p className="text-sm text-red-900">{errorMessage}</p>
                            </>
                        )}
                    </div>
                </div>
            </form>
            {/*)}*/}
        </div>
    );
}

//Needs work - unable to parse https links due to special char in the string, it splits the links in multiple aprts
export function useGetAllSearchParams() {
    const searchParams = useSearchParams();
    const params: { [anyProp: string]: string } = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
}


//export function convertObjectToICard(obj: any): ICard {
//    const card: ICard = {
//        id: obj.id,
//        title_main: obj.title_main,
//        title_description: obj.title_description,
//        scene_id: obj.scene_id,
//        scene_img: obj.scene_img,
//        image_alt: obj.image_alt,
//        image_background: obj.image_background,
//        icon_alt: obj.icon_alt,
//        icon_img: obj.icon_img,
//        bottom_title: obj.bottom_title,
//        bottom_description: obj.bottom_description,
//        button_reserve: obj.button_reserve,
//    };
//    // If needed to convert booked_count from any to number
//    if (obj.booked_count !== undefined) {
//        card.booked_count = parseInt(obj.booked_count);
//    }
//    return card;
//}