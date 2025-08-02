import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ItemRow = (props) => {
    const { label, value } = props;
    return (_jsxs("div", { className: "flex items-center gap-5 text-sm text-gray-300", children: [_jsx("span", { className: "text-right font-bold w-[20%] text-gray-400", children: label }), _jsx("span", { children: value })] }));
};
