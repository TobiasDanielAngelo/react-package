import type { Option } from "../constants/interfaces";
export declare const MyDropdownSelector: (props: {
    label?: string;
    options?: Option[];
    value?: number;
    onChangeValue: (t: number) => void;
    fetchFcn?: (t: string) => void;
    msg?: string;
}) => import("react/jsx-runtime").JSX.Element;
