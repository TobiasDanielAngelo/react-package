import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
export const MyMultiDropdownSelector = (props) => {
    const { label, options = [], onChangeValue, value = [], msg, relative, open, maxSelections, isAll, } = props;
    const [isOpen, setOpen] = useState(open ?? false);
    const dropdownRef = useRef(null);
    const [selectAll, setSelectAll] = useState(isAll);
    const onToggle = (id) => {
        if (value.includes(id)) {
            onChangeValue(value.filter((v) => v !== id));
        }
        else {
            if (!maxSelections || value.length < maxSelections) {
                onChangeValue([...value, id]);
            }
        }
    };
    useEffect(() => {
        onChangeValue(selectAll ? options.map((s) => s.id) : []);
    }, [selectAll, options.length]);
    useEffect(() => {
        onChangeValue(selectAll ? options.map((s) => s.id) : value === null ? [] : value);
    }, []);
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    return (_jsxs("div", { className: "mb-3 relative", ref: dropdownRef, children: [label && (_jsx("label", { className: "block text-xs font-medium text-blue-600 dark:text-white mb-1", children: label })), _jsxs("div", { onClick: () => setOpen(!isOpen), className: "cursor-pointer border bg-teal-100 dark:bg-gray-800 dark:border-gray-600 border-teal-300 p-2 rounded-lg text-sm text-gray-700 dark:text-white flex justify-between items-center", children: [_jsx("span", { className: "truncate", children: !value || value.length === 0
                            ? `Select ${label}`
                            : `${value.length} item${value.length > 1 ? "s" : ""} selected.` }), _jsx("span", { className: "ml-2 text-gray-500 dark:text-gray-300 text-xs", children: "\u25BC" })] }), isOpen && (_jsxs("div", { className: "mt-1 absolute z-10 left-0 right-0 border rounded-lg bg-white dark:bg-gray-900 shadow-lg max-h-60 overflow-y-auto", style: { position: relative ? "relative" : "absolute" }, children: [_jsxs("label", { className: "flex items-center gap-2 p-2 text-sm hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer dark:text-white", children: [_jsx("input", { type: "checkbox", checked: selectAll, onChange: () => setSelectAll((t) => !t), className: "form-checkbox text-blue-500" }), "Select All"] }), options.map((opt) => (_jsxs("label", { className: "flex items-center gap-2 p-2 text-sm hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer dark:text-white", children: [_jsx("input", { type: "checkbox", checked: value.includes(opt.id), onChange: () => onToggle(opt.id), className: "form-checkbox text-blue-500" }), opt.name] }, opt.id)))] })), _jsx("label", { className: "block text-xs font-medium dark:text-white mb-3 text-red-600", children: msg })] }));
};
