import { Field } from "../../constants/interfaces";
export interface MyGenericFormProps<T> {
    item?: T & {
        id?: number | string;
    };
    setVisible?: (t: boolean) => void;
    fetchFcn?: () => void;
    fields: Field[][];
    objectName: string;
    store: {
        addItem: (details: T) => Promise<any>;
        updateItem: (id: number | string, item: T) => Promise<any>;
        deleteItem: (id: number | string) => Promise<any>;
    };
    dateFields?: string[];
    datetimeFields?: string[];
    timeFields?: string[];
}
export declare function MyGenericForm<T>({ item, setVisible, fetchFcn, fields, objectName, store, dateFields, datetimeFields, timeFields, }: MyGenericFormProps<T>): import("react/jsx-runtime").JSX.Element;
