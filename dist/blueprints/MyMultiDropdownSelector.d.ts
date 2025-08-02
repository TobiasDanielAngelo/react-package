import type { Option } from "../constants/interfaces";
export declare const MyMultiDropdownSelector: (props: {
    label?: string;
    value: (number | string)[];
    onChangeValue: (t: (number | string)[]) => void;
    options?: Option[];
    msg?: string;
    relative?: boolean;
    open?: boolean;
    maxSelections?: number;
    isAll?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
