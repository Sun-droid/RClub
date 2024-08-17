import {Dispatch, SetStateAction, useRef} from 'react';
import React, {useState, useEffect} from "react";
//import {useState} from 'react';
import {ButtonProps} from '@/app/types/types';
import {ButtonScene} from '@/app/components/dashboard/buttons';

const ScenesButtonOptGroup: React.FunctionComponent<{
    data: ButtonProps[],
    ckSceneId: Dispatch<SetStateAction<number | undefined>>, sceneSelectionVal: Number | null
}> = ({
          data: scenesOpt, ckSceneId: setSceneValSelected, sceneSelectionVal: sceneSelectionVal
      }) => {
    const [activeIdx, setActiveIdx] = useState(sceneSelectionVal)
    const [sceneChosen, setSceneChosen] = useState(false);
    useEffect(() => {
        // Update active index if the selected scene value changes externally
        setActiveIdx(sceneSelectionVal);
      }, [sceneSelectionVal]);

    return (
        <div className="w-full grid grid-cols-3 gap-4 content-evenly ... justify-items-center ... ">
            {scenesOpt.map((inner, index) => (
                <div id={'scenesButtonGroup'} className='relative' key={inner.id}>
                    <div className=''>
                        <p className="absolute pt-6 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ... font-thin text-lg text-white"
                           onClick={() => {
                               setActiveIdx(index);
                               inner.cb(index);
                               setSceneChosen(true);
                               setSceneValSelected(inner.id)
                               console.log('idx= ', inner.id)
                           }}> {inner.title}</p>
                    </div>
                    <ButtonScene
                        className={activeIdx === index ? "active" : "wait"}
                        onClick={() => {
                            setActiveIdx(index);
                            inner.cb(index);
                            setSceneChosen(true);
                            setSceneValSelected(inner.id)
                            console.log('idx= ', inner.id)
                        }}
                        selected={sceneChosen}
                        title={inner.title}
                        background={inner.background}
                        backgroundAltText={inner.backgroundAltText}
                        //Undefined if missing in the object, causing err for required map-key.
                        key={inner.id}
                        //This options is for specific functions for each button when needed
                        cb={function (idx: number): void {
                            throw new Error("Function not implemented.");
                        }}
                        seats={inner.seats}/>
                </div>
            ))
            }
        </div>
    )
}
export default ScenesButtonOptGroup