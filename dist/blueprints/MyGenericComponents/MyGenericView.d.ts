import { SetURLSearchParams } from "react-router-dom";
import { VisibleMap } from "../../constants/hooks";
import { ActionModalDef, GraphType, KV, PaginatedDetails, StateSetter } from "../../constants/interfaces";
import { GenericViewProps } from "./MyGenericProps";
import { Related } from "../../api";
import { IStore } from "../../api/GenericStore";
export declare const useViewValues: <U extends Object & {
    id?: number | string | null;
}, T extends {
    $view: Record<string, any>;
}>(settingStore: IStore, name: string, obj: T, graphs?: GraphType[]) => {
    pageDetails: PaginatedDetails;
    setPageDetails: import("react").Dispatch<import("react").SetStateAction<PaginatedDetails>>;
    params: URLSearchParams;
    setParams: SetURLSearchParams;
    availableGraphs: ("area" | "line" | "pie" | "bar")[];
    graph: "area" | "line" | "pie" | "bar";
    setGraph: import("react").Dispatch<import("react").SetStateAction<"area" | "line" | "pie" | "bar">>;
    shownFields: (keyof U)[];
    setShownFields: import("react").Dispatch<import("react").SetStateAction<(keyof U)[]>>;
    sortFields: string[];
    setSortFields: import("react").Dispatch<import("react").SetStateAction<string[]>>;
    objWithFields: Record<string, any>;
};
export declare const MyGenericView: (<T extends Record<string, any>>(props: {
    fetchFcn: () => void;
    Context: React.Context<GenericViewProps<T> | null>;
    CollectionComponent: React.FC;
    TableComponent: React.FC;
    FormComponent: React.ComponentType<{
        setVisible: (v: boolean) => void;
        fetchFcn: () => void;
    }>;
    FilterComponent: React.FC;
    shownFields: (keyof T)[];
    setShownFields: StateSetter<(keyof T)[]>;
    objWithFields: Record<string, any>;
    sortFields: string[];
    setSortFields: StateSetter<string[]>;
    graph: GraphType;
    setGraph: StateSetter<GraphType>;
    availableGraphs: GraphType[];
    actionModalDefs?: readonly ActionModalDef[];
    pageDetails: PaginatedDetails | undefined;
    setPageDetails: StateSetter<PaginatedDetails | undefined>;
    isVisible: VisibleMap;
    setVisible: (index: number, visible: boolean) => void;
    params: URLSearchParams;
    setParams: SetURLSearchParams;
    related: Related[];
    itemMap: KV<any>[];
    title: string;
    useStore: () => any;
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
