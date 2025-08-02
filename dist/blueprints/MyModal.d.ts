import { PropsWithChildren } from "react";
import { StateSetter } from "../constants/interfaces";
export declare const MyModal: (props: PropsWithChildren<{
    isVisible: boolean;
    setVisible: StateSetter<boolean>;
    fullWidth?: boolean;
    title?: string;
    subTitle?: string;
    disableClose?: boolean;
}>) => import("react/jsx-runtime").JSX.Element;
