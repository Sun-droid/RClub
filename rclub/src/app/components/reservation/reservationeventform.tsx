'use client'

import {lusitana} from '@/app/ui/fonts';
import {
    ExclamationCircleIcon,
    EnvelopeIcon,
    UserIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';
import {ButtonSubmit} from '@/app/ui/button';
import {ButtonFill} from './buttonfill';
import {useFormState} from 'react-dom';
import {addToDataFile} from '@/app/(primary)/events/reserve/actions';
import {useState} from 'react';
import Tooltip from "@/app/components/tooltip";
import useTimeout from "@/app/components/useTimeout";
import React from "react";
import {IProps} from '@/app/types/types';
import {useSearchParams} from 'next/navigation'
//import CardReserve from '@/app/components/cardreserve'
import Card from '@/app/components/card'

export default function ReserveEventForm({dataProp}: { dataProp: IProps }) {
    const searchParams = useSearchParams();
    const itemGetObj = JSON.parse(searchParams.getAll('reservemodalform')[0]);
    const [errorMessage, dispatch] = useFormState(addToDataFile, undefined);
    const [runVisibleTooltip, setRunVisibleTooltip] = useState(false);
    const [visibleTooltip, setVisibleTooltip] = useState(false);
    const [autoFill, setAutoFill] = useState(false);
    const [autoFillOff, setAutoFillOff] = useState(true);
    //    Autofill
    const [val01, setVal01] = useState<undefined | string | number>('');
    const [val02, setVal02] = useState<undefined | string | number>('');
    const [val03, setVal03] = useState<undefined | number | string>(0);
    const AidFill = ["Alice Blackheart", "thisisalice@mail.com", "533294-223"]
    let cn = 0
    const autoFillAid = () => {
        if (!autoFill) {
            setAutoFill(true)
            //Warning: State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().
            setAutoFillOff(false)
            //Future - use another approach
            setVal01(AidFill[0])
            setVal02(AidFill[1])
            setVal03(AidFill[2])
        } else {
            setAutoFill(false)
            setAutoFillOff(true)
            //Future - set/(return to) the last value filled by user
            setVal01('')
            setVal02('')
            setVal03('')
        }
    };

    let c = 0
    useTimeout(() => setRunVisibleTooltip(true), !runVisibleTooltip ? 4000 : null);
    if (runVisibleTooltip && c === 0) {
        setVisibleTooltip(true)
        setRunVisibleTooltip(false)
        c++;
    }
    useTimeout(() => setVisibleTooltip(false), visibleTooltip ? 3000 : null);
    return (
        <form action={dispatch} className="space-y-3 w-full">
            <div className=" relative flex-1 rounded-lg w-full bg-amber-600 px-6 pb-4 <pt-8></pt-8>">
                <h1 className={`${lusitana} mb-3 text-2xl text-center text-white pt-16`}>
                    Reservation
                </h1>
                <div className="absolute ... w-1/3 h-1/6 text-s top-0 right-0 z-30 space-x-2 ">
                    <div className="float-right ... flex items-center">
                        <span className="text-white mr-2.5 h-full">Aid</span>
                        <Tooltip init_enabled={visibleTooltip} disabled={false} content={"Dev tool"}>
                            <ButtonFill onClick={autoFillAid} selected={autoFill} cb={function (idx: number): void {
                                throw new Error('Function not implemented.');
                            }}/>
                        </Tooltip>
                    </div>
                </div>
                <div
                    className="mb-2 mt-5 block text-xs font-medium text-gray-900" /*htmlFor="imagebackground"*/ >
                    <div
                        className="bg-gradient-to-r from-amber-700 via-amber-700 to-transparent to-80% /*border-l-2 border-slate-300*/ w-full mb-2 text-xs font-medium text-gray-900">
                        <div className="w-full">
                        </div>
                        <div className="sceneButtonInForm">
                            <div className="flex flex-col min-h-fit mx-auto max-w-2xl px-0 pt-0 pb-0">
                                {/*<CardReserve dataProp={itemGetObj}/>*/}
                                <Card dataProp={itemGetObj} reserveButton={false} renderAdminColumn={false} session={null}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-lg text-center text-white font-medium text-gray-900 pt-4"
                            htmlFor="title"
                        >
                            Conctact details
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="person_name"
                                type="text"
                                name="person_name"
                                placeholder="Full name"
                                required
                                value={val01 || ''}
                                onChange={e => setVal01(e.target.value)}
                            />
                            <UserIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="description"
                        >
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="person_email"
                                type="text"
                                name="person_email"
                                placeholder="Email address"
                                required
                                value={val02 || ''}
                                onChange={e => setVal02(e.target.value)}
                            />
                            <EnvelopeIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="imagemain"
                        >
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="person_phone"
                                type="text"
                                name="person_phone"
                                placeholder="Phone number"
                                required
                                value={val03 || ''}
                                onChange={e => setVal03(e.target.value)}
                            />
                            <PhoneIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <input
                        className="hidden"
                        id="obj_pass"
                        type="text"
                        name="obj_pass"
                        required
                        value={JSON.stringify(itemGetObj) || ''}
                        onChange={e => (e.target.value)}
                    />
                </div>
                {/*<ButtonSubmit/>*/}

                <div className="w-full sm:w-auto">
                    <ButtonSubmit disabled={errorMessage !== null} styleButton="fill bg-amber-900"
                                  icon={<ExclamationCircleIcon className="h-5 w-5 text-white"/>}>
                        {"Reserve"}
                    </ButtonSubmit>
                </div>                <div
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
    );
}


//Future
//                    <div>
//                        <div
//                            className="mb-2 mt-5 block text-xs font-medium text-gray-900" /*htmlFor="imagebackground"*/ >
//                            
//                            <p className={`${lusitana} text-2xl text-center text-white`}>Payment method</p><p className={`${lusitana} text-sm text-center text-white`}>(Future)</p><br/><br/>
//                            <div className="grid grid-cols-2 w-full mb-2 text-xs font-medium text-gray-900">
//                                <p className={`${lusitana} text-sm text-center text-white`}>Opts</p>
//                            </div>
//                        </div>
//                        <div
//                            className="mb-2 mt-5 block text-xs font-medium text-gray-900" /*htmlFor="imagebackground"*/ >
//                            
//                            <p className={`${lusitana} text-2xl text-center text-white`}>Ticket Protection</p><p className={`${lusitana} text-sm text-center text-white`}>(Future)</p><br/><br/>
//                            <div className="grid grid-cols-2 w-full mb-2 text-xs font-medium text-gray-900">
//                                <p className={`${lusitana} text-sm text-center text-white`}>Opts</p>
//                            </div>
//                        </div>
//                        <div
//                            className="mb-2 mt-5 block text-xs font-medium text-gray-900" /*htmlFor="imagebackground"*/ >
//                            
//                            <p className={`${lusitana} text-2xl text-center text-white`}>Update News&Offers</p><p className={`${lusitana} text-sm text-center text-white`}>(Future)</p><br/><br/>
//                            <div className="grid grid-cols-2 w-full mb-2 text-xs font-medium text-gray-900">
//                                <p className={`${lusitana} text-sm text-center text-white`}>Opts</p>
//                            </div>
//                        </div>
//                        <div
//                            className="mb-2 mt-5 block text-xs font-medium text-gray-900" /*htmlFor="imagebackground"*/ >
//                            
//                            <p className={`${lusitana} text-2xl text-center text-white`}>Terms</p><p className={`${lusitana} text-sm text-center text-white`}>(Future)</p><br/><br/>
//                            <div className="grid grid-cols-2 w-full mb-2 text-xs font-medium text-gray-900">
//                                <p className={`${lusitana} text-sm text-center text-white`}>Opts</p>
//                            </div>
//                        </div>
//                    </div>