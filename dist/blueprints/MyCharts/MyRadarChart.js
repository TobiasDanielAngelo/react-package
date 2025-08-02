import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, } from "recharts";
import { COLORS, useTrendChart } from ".";
import { MyMultiDropdownSelector } from "../MyMultiDropdownSelector";
import { MyCustomTooltip } from "./MyCustomToolTip";
/**
 * RadarChart Component
 *
 * Compares multiple dimensions (e.g., KPI scores).
 *
 * Data shape:
 * [
 *   { subject: string; A: number },
 *   ...
 * ]
 *
 * Props:
 * - data: metric set per subject
 * - dataKey: metric field
 *
 * Best for:
 * - Performance profiles
 * - Category scoring
 */
export const MyRadarChart = observer(({ data, width = "100%", height = "80%", colors = COLORS, traceKey, xKey, yKey, itemMap, related, formatter, excludedFromTotal, selectionLabel, title, }) => {
    const { allTraceKeys, transformedData, shownFields, setShownFields } = useTrendChart(data, traceKey ?? "", xKey, yKey, itemMap, related, excludedFromTotal);
    return (_jsxs("div", { className: "w-full h-full rounded-xl shadow-xl", children: [_jsx("h5", { className: "text-xl font-bold m-2", children: title }), _jsx(MyMultiDropdownSelector, { value: shownFields, onChangeValue: (t) => setShownFields(t), options: allTraceKeys.map((s) => ({ id: s, name: s })), label: selectionLabel ?? "Items", isAll: true }), _jsx(ResponsiveContainer, { width: width, height: height, children: _jsxs(RadarChart, { data: transformedData, children: [_jsx(PolarGrid, { strokeDasharray: "5 10" }), _jsx(PolarRadiusAxis, {}), _jsx(PolarAngleAxis, { dataKey: xKey }), _jsx(Legend, {}), _jsx(Tooltip, { content: _jsx(MyCustomTooltip, {}), formatter: formatter }), allTraceKeys
                            .filter((s) => shownFields.includes(s))
                            .map((key, i) => (_jsx(Radar, { type: "monotone", dataKey: key, stroke: colors[i % colors.length], fill: colors[i % colors.length] }, key)))] }) })] }));
});
