import { Field } from "../constants/interfaces";
type FormProps = {
    fields: (Field | undefined)[][];
    title: string;
    objectName?: string;
    details: any;
    setDetails: (t: any) => void;
    onClickSubmit: () => void;
    onClickSubmitAdd: () => void;
    hasDelete?: boolean;
    onDelete?: () => Promise<void>;
    msg?: Object;
    isLoading?: boolean;
};
export type MyFormProps<T extends Object & {
    id: number | null;
}> = {
    item?: T;
    setVisible?: (t: boolean) => void;
    fetchFcn?: () => void;
};
export declare const MyForm: (({ fields, title, objectName, details, setDetails, onClickSubmit, onClickSubmitAdd, hasDelete, onDelete, msg, isLoading, }: FormProps) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export {};
