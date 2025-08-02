import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import moment from "moment";
import { GuidedDiv } from "../blueprints/MyGuidedDiv";
import { isDatetimeValue, isDateValue, toMoney } from "./helpers";
import ReactMarkdown from "react-markdown";
export function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    }
    catch {
        return false;
    }
}
export function prettifyJSON(str) {
    try {
        const obj = JSON.parse(str);
        return JSON.stringify(obj, null, 2); // 2-space indent
    }
    catch {
        return str; // or throw an error, or return '', up to you
    }
}
export const formatValue = (value, key, prices, kv, arrayIsInfinite) => {
    const formatList = (value, formatStr, suffixLabel) => {
        const list = value
            .slice(0, 3)
            .map((s) => moment(s).format(formatStr))
            .join("\n");
        const remaining = value.length - 4;
        const suffix = arrayIsInfinite
            ? `${suffixLabel}ad infinitum...`
            : value.length > 4
                ? `${suffixLabel}and ${remaining} more...`
                : "";
        const finalDate = !arrayIsInfinite && value.length > 3
            ? `\nup to ${moment(value[value.length - 1]).format(formatStr)}`
            : "";
        return list + suffix + finalDate;
    };
    const fileExtensionRegex = /\.(jpg|jpeg|png|gif|pdf|docx?|xlsx?|txt)$/i;
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;
    if (kv) {
        const lookup = (val) => kv.label === ""
            ? kv.values.find((_, i) => i === val)
            : kv.values.find((v) => v.id === val)?.[kv.label] ?? "—";
        return Array.isArray(value) ? value.map(lookup).join(",") : lookup(value);
    }
    if (prices?.includes(key))
        return toMoney(value);
    if (value instanceof File) {
        const url = URL.createObjectURL(value);
        return (_jsxs("a", { href: url, download: value.name, children: ["\u2B07\uFE0F Download ", value.name] }));
    }
    else if (value instanceof Blob) {
        const url = URL.createObjectURL(value);
        return (_jsx("a", { href: url, download: "file", children: "\u2B07\uFE0F Download file" }));
    }
    else if (typeof value === "string" && value.match(fileExtensionRegex)) {
        return (_jsx(GuidedDiv, { title: imageExtensions.test(value) ? _jsx("img", { src: value, width: 200 }) : value, children: _jsx("a", { href: value, target: "_blank", rel: "noopener noreferrer", children: "\uD83D\uDD17 Link" }) }));
    }
    if (typeof value === "boolean") {
        return value ? "✅ Yes" : "❌ No";
    }
    if (Array.isArray(value) && value.length > 0) {
        if (isDatetimeValue(value[0])) {
            return formatList(value, "MMM D, YYYY h:mm A", "\n");
        }
        if (isDateValue(value[0])) {
            return formatList(value, "MMM D, YYYY", "and ");
        }
        else {
            return value.join(", ");
        }
    }
    else {
        if (isDatetimeValue(value)) {
            return moment(value).format("MMM D, YYYY h:mm A");
        }
        if (isDateValue(value)) {
            return moment(value).format("MMM D, YYYY");
        }
    }
    return value && value !== "—" ? (_jsx(ReactMarkdown, { children: prettifyJSON(String(value)) || "—" })) : ("—");
};
