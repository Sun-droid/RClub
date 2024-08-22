'use client'

import React, {useState, useEffect} from "react";
import {useSearchParams} from 'next/navigation';
import {ICard} from '@/app/types/types';
import convertObjectToICard from '@/app/components/convertObjectToICard';
import Card from '@/app/components/card'
import {ButtonSubmit} from '@/app/ui/button';
import {useFormState} from "react-dom";
import {deleteObject} from '@/app/(primary)/admin/lib/actions';
import {ExclamationCircleIcon, TrashIcon} from '@heroicons/react/24/outline';

interface DeleteProps {
    dataProp: ICard | undefined;
}

//const createRecoverDateFrame = (id: number) => {
//    const year = id.toString().slice(0, 4);
//    const month = id.toString().slice(4, 6);
//    const day = id.toString().slice(6, 8);
//    return `${day.replace(/^0+/, '')}/${month.replace(/^0+/, '')} ${year}`;
//};


export default function DeleteCard({dataProp}: DeleteProps) {
    const [errorMessage, dispatch] = useFormState(deleteObject, undefined);
    const [itemGetObj, setItemGetObj] = useState<ICard>();
    const searchParams = useSearchParams();
    const param = searchParams.toString().split('deletemodal=true&')[1]
    const [valId, setValId] = useState<undefined | number>(0);

    useEffect(() => {
        if (param) {
            // Decode URI component and parse the JSON
            const decodedString = decodeURIComponent(param);
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
//                setValID(itemGetObj?.id)
                setValId(formattedObject.id)
            } catch (error) {
                console.error('JSON Parse Error:', error);
            }
        } else {
            console.warn('No JSON string found after deletemodal=true&');
        }

    }, [param, searchParams])
    const buttonText = `The will be \n deleted`
//    console.log("searchParams.get('deletemodal') ", itemGetObj)

    return (
        <form action={dispatch} className="space-y-3 w-full">
            <div className="space-y-2 w-full overflow-hidden">
                <div className="relative flex-1 rounded-lg w-full h-full bg-amber-600 px-0 pb-0">
                    <div className="w-full h-full block text-xs font-medium text-gray-900">
                        <div
                            className="flex w-full h-full bg-gradient-to-r from-amber-700 via-amber-700 to-transparent to-80% text-gray-900">
                            {/*<div className="flex-box min-w-[100%] h-full border-8 ticketborder">*/}
                            <div className="flex-box w-full h-full border-8 ticketborder">
                                {itemGetObj &&
                                    <div>
                                        <Card dataProp={itemGetObj} reserveButton={false} renderAdminColumn={false}
                                              session={null}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-auto place-content-center bg-amber-700">
                    <div className="text-center text-white"><p>{`The ${itemGetObj?.title_main}`}</p> <p
                        className="max-w-[25%] text-black m-auto animate-pulse">will be deleted</p></div>

                    <div className="flex place-content-center">
                        <ButtonSubmit disabled={errorMessage !== null}
                                      styleButton="/*max-w-[50%]*/ bg-red-800 m-auto mt-6 mb-6"
                                      icon={<ExclamationCircleIcon className="h-5 w-5 text-white"/>}>
                            {<div
                                className="flex place-content-center group/btns transition ease-in delay-500 duration-1000 hover:scale-75">
                                <p className="group-hover/btns:hidden">Comfirm</p><TrashIcon
                                className="h-5 w-5 text-white hidden group-hover/btns:inline"/></div>}
                        </ButtonSubmit>
                    </div>
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
                            //                            value={valId || ''}
                            //                            onChange={e => setValId(Number(e.target.value))}
                            value={JSON.stringify(itemGetObj)}
                            onChange={e => setValId(Number(e.target.value))}
                        />
                    </div>
                }
            </div>
        </form>
    );
}

//Future
//Handle bookings - event expected to have ended, bookings date already passed, other...
//On hold delete
//Recover features
//Timer for delete
//Reminder for deletion

//Card could display the booked, sold items/seats.