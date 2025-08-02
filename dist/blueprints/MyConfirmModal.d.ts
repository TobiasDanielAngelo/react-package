import { StateSetter } from "../constants/interfaces";
export declare const MyConfirmModal: (props: {
    isVisible: boolean;
    setVisible: StateSetter<boolean>;
    onClickCheck: () => void;
    objectName?: string;
    actionName?: string;
    msg?: Object;
    isLoading?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
