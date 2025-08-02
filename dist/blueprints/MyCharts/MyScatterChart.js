import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, } from "recharts";
import { MyCustomTooltip } from "./MyCustomToolTip";
export const scatterData = [
    { x: 100, y: 200 },
    { x: 120, y: 100 },
    { x: 170, y: 300 },
    { x: 140, y: 250 },
];
/**
 * ScatterChart Component
 *
 * Displays correlation between two numerical values.
 *
 * Data shape:
 * [
 *   { x: number; y: number },
 *   ...
 * ]
 *
 * Props:
 * - data: list of points
 * - x/y: specify axis keys
 *
 * Best for:
 * - Correlation and distribution analysis
 * - Detecting outliers
 */
export const MyScatterChart = () => (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(ScatterChart, { children: [_jsx(CartesianGrid, { strokeDasharray: "5 10" }), _jsx(XAxis, { dataKey: "x", name: "X" }), _jsx(YAxis, { dataKey: "y", name: "Y" }), _jsx(Tooltip, { content: _jsx(MyCustomTooltip, {}), cursor: { strokeDasharray: "3 3" } }), _jsx(Scatter, { name: "A", data: scatterData, fill: "#8884d8" })] }) }));
