'use client'

import { useState } from 'react'
import { defaultColor, getRandomColor } from "./colour";
export default function AddedModal() {
        const [opacity, setOpacity] = useState(true);
        const [color, setColor] = useState(defaultColor);
        const nextColor = getRandomColor();
        setTimeout(() => {
            setOpacity(false);
            setColor(nextColor);
//        }, 3000)
        }, 500)
    return (
        <div className={`card--primary bg-white modal-layout flex items-center justify-center ${opacity ? 'show' : 'hidden'}`}><p>Just added</p></div>
    )
}