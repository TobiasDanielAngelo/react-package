import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, } from "recharts";
import { useCircleChart } from ".";
import { MyCustomTooltip } from "./MyCustomToolTip";
/**
 * RadialBarChart Component
 *
 * Visualizes values in a radial format (circular bars).
 *
 * Data shape:
 * [
 *   { name: string; value: number; fill?: string },
 *   ...
 * ]
 *
 * Props:
 * - data: circular bar segments
 * - dataKey: value to display
 *
 * Best for:
 * - Ranked comparisons (like pie but with bars)
 * - Dashboard KPIs
 */
export const MyRadialBarChart = observer(({ data, dataKey, nameKey, traceKey, itemMap, }) => {
    const { resolvedData } = useCircleChart(data, nameKey, dataKey, traceKey, itemMap);
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(RadialBarChart, { innerRadius: "20%", outerRadius: "90%", data: resolvedData, startAngle: 180, endAngle: -180, children: [_jsx(RadialBar, { dataKey: dataKey, cornerRadius: 10, fill: "#8884d8", background: true }), _jsx(Tooltip, { content: _jsx(MyCustomTooltip, {}) })] }) }));
});
