import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MyCustomTooltip = ({ active, payload, label, formatter, }) => {
    if (!active || !payload || !payload.length)
        return null;
    return (_jsxs("div", { className: "p-2 rounded bg-teal-100 dark:bg-gray-700 border border-teal-400 gray-shadow text-sm dark:text-white", children: [_jsx("p", { className: "font-semibold mb-1", children: label }), payload.map((entry, index) => {
                const formatted = formatter
                    ? formatter?.(entry.value, entry.name, entry, index, payload)
                    : entry.value;
                const [valueFormatted, nameFormatted] = Array.isArray(formatted)
                    ? formatted
                    : [formatted, entry.name];
                return (_jsxs("p", { style: { color: entry.color }, children: [nameFormatted, ": ", _jsx("strong", { children: valueFormatted })] }, index));
            })] }));
};
