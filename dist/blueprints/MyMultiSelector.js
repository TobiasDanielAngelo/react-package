import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MyMultiSelector = (props) => {
    const { label, value, onChangeValue, options, msg } = props;
    const onClickItem = (t) => {
        onChangeValue(value.includes(t) ? value.filter((s) => s !== t) : [...value, t]);
    };
    return (_jsxs("div", { children: [_jsx("label", { className: "text-xs text-blue-600", children: label ?? "Select Items" }), _jsx("div", { className: "flex flex-row justify-evenly items-center py-2", children: options?.map((s) => (_jsx("div", { className: value.includes(s.id)
                        ? "cursor-pointer text-blue-600 font-bold"
                        : "cursor-pointer text-gray-400", onClick: () => onClickItem(s.id), children: s.name }, s.id))) }), _jsx("label", { className: "block text-xs font-medium dark:text-white mb-3 text-red-600", children: msg })] }));
};
