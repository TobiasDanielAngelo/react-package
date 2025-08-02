import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, } from "recharts";
const rawData = [
    { date: "2025-06-01", events: 2 },
    { date: "2025-06-02", events: 4 },
    { date: "2025-06-04", events: 1 },
];
export function fillMissingDatesWithNulls(data, startDate, endDate) {
    const result = [];
    const current = new Date(startDate);
    const end = new Date(endDate);
    const map = Object.fromEntries(data.map(({ date, events }) => [date, events]));
    while (current <= end) {
        const key = current.toISOString().slice(0, 10);
        result.push({
            date: key,
            events: key in map ? map[key] : null,
        });
        current.setDate(current.getDate() + 1);
    }
    return result;
}
const timelineData = fillMissingDatesWithNulls(rawData, "2025-06-01", "2025-06-05");
export default function MyTimelineChart() {
    return (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: timelineData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "date" }), _jsx(YAxis, { allowDecimals: false }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "events", stroke: "#8884d8", strokeWidth: 2, dot: { r: 4 }, connectNulls: true })] }) }));
}
