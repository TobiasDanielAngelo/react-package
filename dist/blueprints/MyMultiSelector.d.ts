import { Option } from "../constants/interfaces";
export declare const MyMultiSelector: (props: {
    label?: string;
    value: (number | string)[];
    onChangeValue: (t: (number | string)[]) => void;
    options?: Option[];
    msg?: string;
}) => import("react/jsx-runtime").JSX.Element;
