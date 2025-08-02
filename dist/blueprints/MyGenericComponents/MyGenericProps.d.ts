import { SetURLSearchParams } from "react-router-dom";
import { GraphType, KV, PaginatedDetails, StateSetter } from "../../constants/interfaces";
import { Related } from "../../api";
export interface GenericViewProps<T> {
    shownFields: (keyof T)[];
    setShownFields: StateSetter<(keyof T)[]>;
    sortFields: string[];
    setSortFields: StateSetter<string[]>;
    params: URLSearchParams;
    setParams: SetURLSearchParams;
    pageDetails: PaginatedDetails | undefined;
    setPageDetails: StateSetter<PaginatedDetails | undefined>;
    PageBar: React.FC;
    fetchFcn: () => void;
    itemMap: KV<any>[];
    related: Related[];
    graph?: GraphType;
}
export declare const defaultViewValues: GenericViewProps<{}>;
export declare function createGenericViewContext<T>(): {
    Context: import("react").Context<GenericViewProps<T> | null>;
    useGenericView: () => GenericViewProps<{}> | GenericViewProps<T>;
};
export declare function createGenericContext<T>(): {
    Context: import("react").Context<T | null>;
    useGeneric: () => NonNullable<T>;
};
