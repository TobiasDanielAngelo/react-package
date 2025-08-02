import { KV, StateSetter } from "../../constants/interfaces";
import { Related } from "../../api";
type MyGenericTableProps<T extends object> = {
    items: T[];
    itemMap?: KV<any>[];
    related?: Related[];
    shownFields: (keyof T & string)[];
    sortFields: string[];
    setSortFields: StateSetter<string[]>;
    priceFields?: string[];
    pageIds: number[];
    setParams: (updater: (params: URLSearchParams) => URLSearchParams) => void;
    params: URLSearchParams;
    PageBar: React.FC;
    renderActions: (item: T) => React.ReactNode;
};
export declare const MyGenericTable: (<T extends Record<string, any>>({ items, itemMap, related, shownFields, sortFields, setSortFields, priceFields, pageIds, setParams, params, PageBar, renderActions, }: MyGenericTableProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export {};
