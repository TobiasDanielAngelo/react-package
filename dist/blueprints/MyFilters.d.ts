import { PropsWithChildren } from "react";
import { StateSetter } from "../constants/interfaces";
export declare const MyFilters: (props: PropsWithChildren<{
    active?: number;
    query?: string;
    setQuery?: StateSetter<string>;
}>) => import("react/jsx-runtime").JSX.Element;
