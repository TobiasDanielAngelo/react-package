import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ReferenceLine, ZAxis, ReferenceArea, } from "recharts";
import moment from "moment";
import { useIsUnhoverable, useVisible, useWindowWidth, } from "../../constants/hooks";
import { useState } from "react";
import { MyModal } from "../MyModal";
import { addDays } from "date-fns";
const renderFullImportanceScale = (importance = 0, filled = "⭐", empty = "⚫") => {
    const count = Math.round(importance / 10); // filled count
    const total = 10;
    return filled.repeat(count) + empty.repeat(total - count);
};
const SunPoint = ({ cx, cy, payload, late }) => {
    const z = payload.z ?? 1;
    const vw = useWindowWidth();
    const scale = (0.4 * vw) / 1920 + 0.3; // Normalize (1920px is base)
    const radius = (10 + z * 0.2) * scale;
    const glow = Math.min(z * 0.3 * scale, 5);
    const opacity = Math.min(0.4 + z / 100, 1);
    return (_jsx("circle", { cx: cx, cy: cy, r: radius, fill: !late ? "#facc15" : "darkred", stroke: !late ? "#fbbf24" : "darkred", strokeWidth: 1, opacity: opacity, style: {
            filter: !late
                ? `drop-shadow(0 0 ${glow}px #facc15)`
                : `drop-shadow(0 0 ${glow}px darkred)`,
        } }));
};
const compress = (value, factor = 0.9) => {
    // factor < 1 pulls it toward 50
    return 50 + (value - 50) * factor;
};
export function MyEisenhowerChart({ items, title = "", width = "100%", height = "85%", }) {
    const [selectedItem, setSelectedItem] = useState();
    const { isVisible1, setVisible1 } = useVisible();
    const isTouch = useIsUnhoverable();
    const minDate = Math.min(...items.map((i) => i.dueDate.getTime()));
    const maxDate = Math.max(...items.map((i) => i.dueDate.getTime()));
    if (items.length === 0)
        return _jsx("div", {});
    const data = items.map((item, _, arr) => {
        const urgency = arr.length > 1 && maxDate !== minDate
            ? 100 - ((item.dueDate.getTime() - minDate) / (maxDate - minDate)) * 100
            : 100;
        const importance = item.importance;
        const x = compress(urgency); // X = urgency (0–100)
        const y = compress(importance); // Y = importance (0–100)
        const late = item.dueDate < addDays(new Date(), -1);
        return {
            late,
            x: x,
            y: y,
            z: (importance * urgency) / 100, // Normalize for reasonable size
            name: item.name,
            item,
        };
    });
    return (_jsxs("div", { className: "w-full h-full min-h-[450px] max-h-[650px] rounded-xl shadow-xl", children: [_jsx("h5", { className: "text-xl font-bold m-2", children: title }), _jsx(MyModal, { isVisible: isVisible1 && isTouch, setVisible: setVisible1, title: selectedItem?.name, children: _jsxs("div", { className: "dark:text-white", children: [_jsxs("div", { children: ["Due: ", moment(selectedItem?.dueDate).format("lll")] }), _jsxs("div", { children: ["Importance: ", renderFullImportanceScale(selectedItem?.importance)] })] }) }), _jsx(ResponsiveContainer, { width: width, height: height, children: _jsxs(ScatterChart, { margin: { top: 30, right: 30, bottom: -10, left: -30 }, children: [_jsx(XAxis, { type: "number", dataKey: "x", domain: [0, 100], axisLine: false, tick: false, tickLine: false }), _jsx(YAxis, { type: "number", dataKey: "y", domain: [0, 100], axisLine: false, tick: false, tickLine: false }), _jsx(ReferenceLine, { x: 50, stroke: "#aaa", strokeWidth: 1, strokeDasharray: "4 4" }), _jsx(ReferenceLine, { y: 50, stroke: "#aaa", strokeWidth: 1, strokeDasharray: "4 4" }), _jsx(ReferenceArea, { x1: 50, x2: 100, y1: 50, y2: 100, fill: "#fef3c7", fillOpacity: 0.4 }), _jsx(ReferenceArea, { x1: 0, x2: 50, y1: 50, y2: 100, fill: "#fde68a", fillOpacity: 0.3 }), _jsx(ReferenceArea, { x1: 50, x2: 100, y1: 0, y2: 50, fill: "#fde68a", fillOpacity: 0.3 }), _jsx(ReferenceArea, { x1: 0, x2: 50, y1: 0, y2: 50, fill: "#facc15", fillOpacity: 0.15 }), _jsx(Tooltip, { content: ({ active, payload }) => {
                                if (!active || !payload?.length)
                                    return null;
                                const { item } = payload[0].payload;
                                return (_jsxs("div", { className: "p-2 dark:bg-gray-800 bg-teal-100 dark:text-white text-xs rounded shadow", children: [_jsx("div", { children: _jsx("b", { children: item.name }) }), _jsxs("div", { children: ["Due: ", moment(item.dueDate).format("lll")] }), _jsxs("div", { children: ["Importance: ", renderFullImportanceScale(item.importance)] })] }));
                            } }), _jsx(Scatter, { name: "Items", data: data, fill: "#0074D9", onClick: (e) => {
                                setSelectedItem(e.payload.item);
                                setVisible1(true);
                            }, shape: (props) => _jsx(SunPoint, { ...props }) }), _jsx(ZAxis, { dataKey: "z", range: [10, 50] })] }) })] }));
}
