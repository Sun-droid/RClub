import {InputHTMLAttributes} from "react";

export interface IOption {
    label: string;
    name?: string;
    disabled?: boolean;
    extra: { [key: string]: IProp }
}

export interface IInputGroup {
    label: string;
    options: IOption[];
    hasFullWidth?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    value?: string | undefined
    checked?: boolean
}

export interface InputElementProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    error?: boolean;
    disabled?: boolean;
    variable?: string
    selected?: boolean
}

export interface IProp {
    variable?: string;
    selected?: boolean;
}