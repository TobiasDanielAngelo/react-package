import { Page, StateSetter } from "../constants/interfaces";
export declare const ResponsiveDrawer: ((props: {
    useStore: () => any;
    open?: boolean;
    setOpen?: StateSetter<boolean>;
    paths?: Page[];
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export declare const MyNavBar: ((props: {
    useStore: () => any;
    title?: string;
    drawerOpen?: boolean;
    setDrawerOpen?: StateSetter<boolean>;
    profileUrl?: string;
    paths?: Page[];
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
