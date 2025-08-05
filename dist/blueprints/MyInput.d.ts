import { HTMLInputTypeAttribute } from "react";
export declare const MyInput: (props: {
    hidden?: boolean;
    label?: string;
    value?: string;
    onChangeValue?: (t: string) => void;
    corrector?: (t: string) => string;
    pattern?: string;
    centered?: boolean;
    isPassword?: boolean;
    optional?: boolean;
    msg?: string;
    type?: HTMLInputTypeAttribute;
}) => import("react/jsx-runtime").JSX.Element;
