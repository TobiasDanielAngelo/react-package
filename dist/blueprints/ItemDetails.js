import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { toRomanWithExponents, toTitleCase } from "../constants/helpers";
import { formatValue } from "../constants/JSXHelpers";
const sectionStyles = {
    Header: "text-sm flex flex-row",
    Important: "font-bold text-3xl px-3 rounded",
    Body: "text-lg px-7",
};
export const ItemDetails = observer(({ item, shownFields = [], header = [], important = [], prices = [], showMore, itemMap = [], related = [], }) => {
    const itemView = item.$view ?? item;
    const allItemKeys = [
        ...new Set(Object.keys(itemView).filter((s) => !s.includes("$"))),
    ];
    const sections = [
        { title: "Header", keys: header },
        { title: "Important", keys: important },
        {
            title: "Body",
            keys: allItemKeys.filter((key) => !header.includes(key) && !important.includes(key)),
        },
    ];
    // const hiddenKeys = allItemKeys.filter((s) => !shownFields.includes(s));
    const renderRow = (key, title) => {
        const value = item[key];
        const relatedName = related?.find((s) => s.field === key && s.id === item[key])?.name;
        const kv = itemMap?.find((s) => s.key === key);
        const keyTitle = key === "id" ? "ID" : toTitleCase(key);
        const body = key === "id"
            ? toRomanWithExponents(value)
            : formatValue(relatedName ?? value, String(key), prices, kv);
        return body === "—" ? (_jsx("div", {}, String(key))) : (_jsxs("div", { className: "flex flex-col xs:flex-row", children: [title === "Body" && (_jsx("span", { className: "pt-2 text-xs font-bold", children: keyTitle })), _jsx("span", { className: "pl-3 whitespace-pre-wrap break-words", children: body })] }, String(key)));
    };
    return (_jsx(_Fragment, { children: sections.map(({ title, keys }) => (_jsx("div", { className: sectionStyles[title] || "", children: keys
                .filter((key) => shownFields.includes(key) || showMore)
                .map((key) => renderRow(key, title)) }, title))) }));
});
