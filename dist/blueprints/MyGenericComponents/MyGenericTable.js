import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { camelToSnakeCase, getStoreSignature, toRomanWithExponents, toTitleCase, } from "../../constants/helpers";
import { formatValue } from "../../constants/JSXHelpers";
import { MyTable } from "../MyTable";
export const MyGenericTable = observer(({ items, itemMap, related, shownFields, sortFields, setSortFields, priceFields, pageIds, setParams, params, PageBar, renderActions, }) => {
    const HeaderWithSort = ({ k }) => {
        const orderByParams = params.getAll("order_by");
        const snakeK = camelToSnakeCase(k);
        const isActive = orderByParams.some((s) => s.replace("-", "") === snakeK);
        const isDescending = orderByParams.includes(`-${snakeK}`);
        const handleSortClick = () => {
            setParams((t) => {
                const newParams = new URLSearchParams(t);
                const existingOrderBy = newParams.getAll("order_by");
                let newOrderBy = [];
                let currentState = "none";
                existingOrderBy.forEach((field) => {
                    if (field === snakeK)
                        currentState = "asc";
                    if (field === `-${snakeK}`)
                        currentState = "desc";
                });
                if (currentState === "none") {
                    newOrderBy = [snakeK, ...existingOrderBy.slice(0, 1)];
                }
                else if (currentState === "asc") {
                    newOrderBy = [
                        `-${snakeK}`,
                        ...existingOrderBy.filter((f) => f.replace("-", "") !== snakeK),
                    ];
                }
                else {
                    newOrderBy = existingOrderBy.filter((f) => f.replace("-", "") !== snakeK);
                }
                newParams.delete("order_by");
                newOrderBy.forEach((field) => newParams.append("order_by", field));
                setSortFields(newOrderBy);
                newParams.set("page", "1");
                return newParams;
            });
        };
        return (_jsxs("div", { className: "items-center justify-center flex flex-row gap-2 cursor-pointer", onClick: handleSortClick, children: [toTitleCase(k), isActive && _jsx("div", { children: isDescending ? "▾" : "▴" })] }));
    };
    const matrix = useMemo(() => {
        if (!items.length)
            return [];
        const header = [
            ...shownFields
                .filter((s) => Object.keys(items[0].$view).includes(s))
                .map((k) => _jsx(HeaderWithSort, { k: k }, k)),
            "Actions",
        ];
        const rows = items
            .filter((item) => pageIds.includes(item.id))
            .sort((a, b) => {
            return (pageIds.indexOf(a.id) ?? 0) - (pageIds.indexOf(b.id) ?? 0);
        })
            .map((item) => [
            ...shownFields
                .filter((s) => Object.keys(items[0].$view).includes(s))
                .map((key) => {
                const relatedName = related?.find((s) => s.field === key && s.id === item[key])?.name;
                return key === "id"
                    ? toRomanWithExponents(item[key])
                    : formatValue(relatedName ?? item[key], key, priceFields);
            }),
            renderActions(item),
        ]);
        return [header, ...rows];
    }, [
        params,
        getStoreSignature(items.map((s) => s.$)),
        shownFields.length,
        Number(pageIds.map(String).join("")),
        itemMap,
    ]);
    useEffect(() => {
        setParams((t) => {
            const newParams = new URLSearchParams(t);
            newParams.delete("order_by");
            sortFields.forEach((field) => newParams.append("order_by", field));
            newParams.set("page", "1");
            return newParams;
        });
    }, []);
    return (_jsxs("div", { className: "flex flex-1 flex-col min-h-[85vh] max-h-[85vh] w-[90%] justify-center m-auto", children: [_jsx("div", { className: "sticky top-0", children: _jsx(PageBar, {}) }), _jsx("div", { className: "flex-1 overflow-scroll", style: {
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }, children: _jsx(MyTable, { matrix: matrix, hidden: !shownFields.length }) })] }));
});
