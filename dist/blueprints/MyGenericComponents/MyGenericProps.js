import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
export const defaultViewValues = {
    shownFields: [],
    setShownFields: () => { },
    sortFields: [],
    setSortFields: () => { },
    params: new URLSearchParams(),
    setParams: () => { },
    setPageDetails: () => { },
    fetchFcn: () => { },
    itemMap: [],
    related: [],
    graph: "line",
    pageDetails: undefined,
    PageBar: () => _jsx(_Fragment, {}),
};
export function createGenericViewContext() {
    const Context = createContext(null);
    const useGenericView = () => {
        const ctx = useContext(Context);
        if (!ctx)
            return defaultViewValues;
        return ctx;
    };
    return { Context, useGenericView };
}
export function createGenericContext() {
    const Context = createContext(null);
    const useGeneric = () => {
        const ctx = useContext(Context);
        if (!ctx)
            throw new Error("useGeneric must be used within its provider");
        return ctx;
    };
    return { Context, useGeneric };
}
