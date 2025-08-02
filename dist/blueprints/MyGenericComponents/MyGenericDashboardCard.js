import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const DashboardCard = (props) => {
    const { stats, title, change, children } = props;
    return (_jsxs("div", { className: "flex flex-row rounded-xl shadow-md h-[100px] p-2 shrink-0 border border-teal-800 dark:bg-gray-900", style: { boxShadow: "6px 6px 12px black" }, children: [_jsx("div", { className: "rounded-lg border-2 items-center my-auto p-5 mx-5 bg-gradient-to-br from-blue-900 via-blue-500 to-blue-700", children: children }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500 font-bold", children: title }), _jsxs("div", { className: "text-lg", children: [_jsx("span", { className: "font-bold", children: stats.toFixed(2) }), _jsx("span", { className: "text-md text-gray-500", children: change ? ` (+${change?.toFixed(1)})` : "" })] })] })] }));
};
