import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MySearchDropdownSelector = (props) => {
    const { label, options, onChangeValue, value, msg } = props;
    return (_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium dark:text-white mt-3 text-blue-600", children: label }), _jsxs("select", { value: value, onChange: (e) => onChangeValue(parseInt(e.target.value)), className: "bg-gray-50 border border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", children: [_jsx("option", { value: -1, children: "Select an Item" }), options?.map((s, ind) => (_jsx("option", { value: s.id, children: s.name }, ind)))] }), _jsx("label", { className: "block text-xs font-medium dark:text-white mb-3 text-red-600", children: msg })] }));
};
