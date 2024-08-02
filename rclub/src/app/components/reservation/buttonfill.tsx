'use client'
import { ButtonProps } from '@/app/types/types';
export function ButtonFill( props: ButtonProps) {
return (
        <button className={`w-14 h-14 rounded-full ... ${props.selected ? "bg-amber-700": "bg-amber-900"}`} type= 'button' onClick={props.onClick} /*selected={props.selected}*/>
            <p className="text-white">Fill</p>
            <p className={`text-white ... ${props.selected ? "hidden ...": ""}`}>off</p>
            <p className={`text-white ... ${!props.selected ? "hidden ...": ""}`}>on</p>
        </button>
    )
}