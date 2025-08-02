import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import { COLORS, useTrendChart } from ".";
import { MyMultiDropdownSelector } from "../MyMultiDropdownSelector";
import { MyCustomTooltip } from "./MyCustomToolTip";
/**
 * BarChart Component
 *
 * Compares categories (e.g., expenses by category).
 *
 * Data shape:
 * [
 *   { category: string; count: number },
 *   ...
 * ]
 *
 * Props:
 * - data: list of category items
 * - dataKey: key to extract numeric value (e.g., "count")
 *
 * Best for:
 * - Categorical comparison
 * - Budget breakdowns
 */
export const MyBarChart = observer(({ data, width = "100%", height = "80%", colors = COLORS, traceKey, xKey, yKey, itemMap, related, formatter, excludedFromTotal, selectionLabel, title = "", }) => {
    const { allTraceKeys, transformedData, shownFields, setShownFields } = useTrendChart(data, traceKey ?? "", xKey, yKey, itemMap, related, excludedFromTotal);
    return (_jsxs("div", { className: "w-full h-full rounded-xl shadow-xl", children: [_jsx("h5", { className: "text-xl font-bold m-2", children: title }), _jsx(MyMultiDropdownSelector, { value: shownFields, onChangeValue: (t) => setShownFields(t), options: allTraceKeys.map((s) => ({ id: s, name: s })), label: selectionLabel ?? "Items", isAll: true }), _jsx(ResponsiveContainer, { width: width, height: height, children: _jsxs(BarChart, { data: transformedData, children: [_jsx(CartesianGrid, { strokeDasharray: "5 10" }), _jsx(Legend, {}), _jsx(XAxis, { dataKey: xKey }), _jsx(YAxis, {}), _jsx(Tooltip, { content: _jsx(MyCustomTooltip, {}), formatter: formatter }), allTraceKeys
                            .filter((s) => shownFields.includes(s))
                            .map((key, i) => (_jsx(Bar, { type: "monotone", dataKey: key, stroke: colors[i % colors.length], fill: colors[i % colors.length] }, key)))] }) })] }));
});
