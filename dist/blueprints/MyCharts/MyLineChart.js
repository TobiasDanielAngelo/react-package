import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import { COLORS, useTrendChart } from ".";
import { MyMultiDropdownSelector } from "../MyMultiDropdownSelector";
import { MyCustomTooltip } from "./MyCustomToolTip";
/**
 * LineChart Component
 *
 * Displays trends over time (e.g., sales per month).
 *
 * Data shape:
 * [
 *   { name: string; value: number },
 *   ...
 * ]
 *
 * Props:
 * - data: list of time series points
 * - dataKey: key to extract value (e.g., "value")
 *
 * Best for:
 * - Time series data
 * - Performance monitoring
 */
export const MyLineChart = observer(({ data, width = "100%", height = "80%", colors = COLORS, traceKey, xKey, yKey, itemMap, related, formatter, excludedFromTotal, selectionLabel, noTotal, title = "", }) => {
    const { allTraceKeys, transformedData, shownFields, setShownFields } = useTrendChart(data, traceKey ?? "", xKey, yKey, itemMap, related, excludedFromTotal, noTotal);
    return (_jsxs("div", { className: "w-full h-full p-2 rounded-xl shadow-xl", children: [_jsx("h5", { className: "text-xl font-bold m-2", children: title }), _jsx(MyMultiDropdownSelector, { value: shownFields, onChangeValue: (t) => setShownFields(t), options: allTraceKeys.map((s) => ({ id: s, name: s })), label: selectionLabel ?? "Items", isAll: true }), _jsx(ResponsiveContainer, { width: width, height: height, children: _jsxs(LineChart, { data: transformedData, children: [_jsx(CartesianGrid, { strokeDasharray: "5 10" }), _jsx(Legend, {}), _jsx(XAxis, { dataKey: xKey }), _jsx(YAxis, { domain: ["auto", "auto"] }), _jsx(Tooltip, { content: _jsx(MyCustomTooltip, {}), formatter: formatter }), allTraceKeys
                            .filter((s) => shownFields.includes(s))
                            .map((key, i) => (_jsx(Line, { type: "monotone", dataKey: key, stroke: colors[i % colors.length], connectNulls: true }, key)))] }) })] }));
});
