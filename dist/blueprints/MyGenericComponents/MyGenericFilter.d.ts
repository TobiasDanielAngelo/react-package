import { Field } from "../../constants/interfaces";
export declare const MyFilter: (({ fields }: {
    fields: Field[][];
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
type Props<T extends Record<string, any>> = {
    view: T;
    title?: string;
    setVisible?: (t: boolean) => void;
    dateFields?: string[];
    excludeFields?: (keyof T)[];
    relatedFields?: string[];
    optionFields?: string[];
};
export declare const MyGenericFilter: <T extends Record<string, any>>({ view, title, dateFields, excludeFields, relatedFields, optionFields, }: Props<T>) => import("react/jsx-runtime").JSX.Element;
export {};
