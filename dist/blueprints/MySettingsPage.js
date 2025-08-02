import { jsx as _jsx } from "react/jsx-runtime";
export const MySettingsPage = (props) => {
    const { children } = props;
    return (_jsx("div", { className: "min-w-2xl min-h-[70vh] mx-auto bg-gray-50 p-4 rounded-lg dark:bg-gray-800 border-b border-teal-200 dark:border-gray-700", children: _jsx("div", { className: "text-gray-500 dark:text-gray-400 text-sm", children: children }) }));
};
