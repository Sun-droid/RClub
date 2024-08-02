import React from "react";
import {Card, CardHeader, CardFooter, Image} from "@nextui-org/react";
import {ICard} from '@/app/types/types'
import ReserveModal from "@/app/components/reservemodal";

export default function App({dataProp, reserveButton}: { dataProp: ICard, reserveButton: Boolean }) {
    return (
        <div className="max-w-[900px] gap-2 grid grid-cols-6 grid-rows-1">
            <Card isFooterBlurred className="w-full h-[300px] col-span-6 sm:col-span-6">
                <CardHeader className="absolute z-10 top-1 flex-1 items-start p-2">
                    <div className="flex flex-col w-9/12 float-left">
                        <p className="text-tiny text-white/60 uppercase font-bold">{dataProp.title_main}</p>
                        <h4 className="text-white/90 font-medium text-xl">{dataProp.title_description}</h4>
                    </div>
                    <div className="flex flex-col w-3/12 float-right bg-black/40 items-end">
                        <h4 className="text-white/90 font-medium text-xl">{dataProp.scene_id}</h4>
                        <div className="w-2/4 h-2/4 flex flex-grow gap-2 items-center  /*blur-sm*/">
                            <Image
                                className="border-2 border-amber-500"
                                radius="full"
                                alt={`${dataProp.scene_id} Scene lights`}
                                src={dataProp.scene_img}
                            />
                        </div>
                        <p className="text-tiny text-white/60 uppercase font-bold">{`Available`}</p>
                        <p className="text-tiny text-white/60 uppercase font-bold">{`Sold out`}</p>
                    </div>
                </CardHeader>
                <Image
                    removeWrapper
                    alt={dataProp.image_alt}
                    className="z-0 w-full h-full object-cover"
                    src={dataProp.image_background}
                />
                <CardFooter
                    className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 p-4 backdrop-blur">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image
                            alt={dataProp.icon_alt}
                            className="rounded-full w-10 h-11 bg-black"
                            src={dataProp.icon_img}
                        />
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">{dataProp.bottom_title}</p>
                            <p className="text-tiny text-white/60">{dataProp.bottom_description}</p>
                        </div>
                    </div>
                    {reserveButton &&
                        <ReserveModal dataProp={dataProp}/>
                    }
                </CardFooter>
            </Card>
        </div>
    );
}