import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { MyIcon } from "./MyIcon";
export const MyDropdownSelector = (props) => {
    const { label, options, onChangeValue, value, msg, fetchFcn } = props;
    const [isOption, setIsOption] = useState(true);
    const [search, setSearch] = useState("");
    const filteredOptions = options?.filter((opt) => opt.name.toLowerCase().includes(search.toLowerCase()));
    useEffect(() => {
        const timer = setTimeout(() => {
            search !== "" && fetchFcn?.(search);
        }, 1000);
        return () => clearTimeout(timer);
    }, [search]);
    return (_jsxs("div", { className: "mb-0 flex flex-row items-center justify-center gap-2", children: [!isOption ? (_jsxs("div", { className: "relative flex-1", children: [_jsx("label", { className: "block text-xs font-medium dark:text-white md:mt-1 text-blue-600", children: label }), _jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search...", className: "bg-teal-100 border border-teal-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" }), search && !options?.map((s) => s.name).includes(search) && (_jsx("ul", { className: "absolute flex-1 w-full z-50 border border-teal-400 dark:bg-gray-800 bg-teal-100 rounded-b-xl rounded-t-md", children: filteredOptions?.map((opt) => (_jsx("li", { onClick: () => {
                                onChangeValue(Number(opt.id));
                                setSearch(opt.name); // or "" if you want to reset
                            }, className: "text-sm z-49 cursor-pointer px-4 py-2 dark:text-white text-black rounded-md dark:hover:bg-gray-600 hover:bg-teal-200", children: opt.name }, opt.id))) })), _jsx("label", { className: "block text-xs font-medium dark:text-white mb-3 text-red-600", children: msg })] })) : (_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-xs font-medium dark:text-white md:mt-1 text-blue-600", children: label }), _jsxs("select", { value: value, onChange: (e) => onChangeValue(parseInt(e.target.value)), className: "bg-teal-100 border border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", children: [_jsxs("option", { value: undefined, children: ["Select ", label] }), options?.map((s, ind) => (_jsx("option", { value: s.id, children: s.name }, ind)))] }), _jsx("label", { className: "block text-xs font-medium dark:text-white mb-3 text-red-600", children: msg })] })), _jsx(MyIcon, { icon: isOption ? "Search" : "ViewList", onClick: () => setIsOption((t) => !t) })] }));
};
