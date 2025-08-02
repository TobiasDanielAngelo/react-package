import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { DAYS_OF_WEEK_CHOICES } from "../constants/constants";
import { toOptions } from "../constants/helpers";
import { useKeyPress, useVisible, useWindowWidth } from "../constants/hooks";
import { MyButton, MyCheckBox, MyColorPicker, MyConfirmModal, MyDateTimePicker, MyDropdownSelector, MyImageUploader, MyInput, MyMultiDropdownSelector, MyMultiSelector, MyTextArea, MyFileUploader, } from "./";
import { MyIcon } from "./MyIcon";
const getMsg = (msg, name) => msg && !`${msg[name]}`.includes("undefined")
    ? `${msg[name]}`.includes("Invalid pk")
        ? "Select one that applies"
        : `${msg[name]}`
    : "";
const renderField = (t, details, onChangeValue, msg, key) => {
    const commonProps = {
        label: t.label,
        value: details[t.name],
        onChangeValue: (u) => onChangeValue(u, t.name),
        msg: getMsg(msg, t.name),
    };
    switch (t.type) {
        case "function":
            return (_jsxs("div", { className: "dark:text-white whitespace-pre-line items-center text-center", children: [_jsx("label", { className: "block text-xs text-left font-medium md:mt-1 text-blue-600", children: t.label }), t.function?.(details)] }, key));
        case "password":
            return _jsx(MyInput, { ...commonProps, isPassword: true }, key);
        case "select":
            return (_jsx(MyDropdownSelector, { ...commonProps, fetchFcn: t.fetchFcn, options: t.options }, key));
        case "date":
        case "time":
        case "datetime":
        case "month":
            return (_createElement(MyDateTimePicker, { ...commonProps, key: key, isDateOnly: t.type === "date" || t.type === "month", dateFormat: t.type === "month" ? "MMM YYYY" : undefined, isTimeOnly: t.type === "time" }));
        case "days":
            return (_jsx(MyMultiSelector, { ...commonProps, options: toOptions(DAYS_OF_WEEK_CHOICES) }, key));
        case "multi":
            return (_jsx(MyMultiDropdownSelector, { ...commonProps, options: t.options }, key));
        case "textarea":
            return (_jsx(MyTextArea, { ...commonProps, value: details[t.name] ?? "", centered: t.centered }, key));
        case "color":
            return _jsx(MyColorPicker, { ...commonProps }, key);
        case "check":
            return _jsx(MyCheckBox, { ...commonProps }, key);
        case "image":
            return (_jsx(MyImageUploader, { value: details[t.name], onChangeValue: (u) => onChangeValue(u, t.name) }, key));
        case "file":
            return (_jsx(MyFileUploader, { value: details[t.name], onChangeValue: (u) => onChangeValue(u, t.name) }, key));
        case "number":
        case "text":
            return (_jsx(MyInput, { ...commonProps, value: details[t.name] ?? "", centered: t.centered }, key));
        default:
            return (_jsx("div", { className: "dark:text-gray-300 items-center justify-center", children: t.label }, key));
    }
};
export const MyForm = observer(({ fields, title, objectName, details, setDetails, onClickSubmit, onClickSubmitAdd, hasDelete, onDelete, msg, isLoading, }) => {
    const hasTextarea = fields.some((row) => row.some((field) => field?.type === "textarea"));
    const formHotKeys = (hasTextarea ? ["Shift", "Enter"] : ["Enter"]);
    useKeyPress(formHotKeys, onClickSubmit);
    const { isVisible1, setVisible1 } = useVisible();
    const width = useWindowWidth();
    const onChangeValue = (val, name) => setDetails({ ...details, [name]: val });
    const onClickDelete = () => {
        setVisible1?.(true);
    };
    const onClickConfirm = async () => {
        await onDelete?.();
    };
    return (_jsxs("div", { className: "max-w-xl mx-auto p-10", children: [_jsx(MyConfirmModal, { isVisible: isVisible1, setVisible: setVisible1, onClickCheck: onClickConfirm, objectName: objectName, actionName: "Delete" }), _jsx("h1", { className: "text-xl mb-2 font-bold leading-tight tracking-tight text-teal-900 md:text-2xl dark:text-white", children: title }), fields.map((row, rowIdx) => (_jsx("div", { className: "grid md:gap-6", style: {
                    gridTemplateColumns: `repeat(${width > 800 ? row.length : 1}, minmax(0, 1fr))`,
                }, children: row.map((t, colIdx) => t ? (renderField(t, details, onChangeValue, msg, colIdx)) : (_jsx("div", {}, colIdx))) }, rowIdx))), _jsxs("label", { className: "block text-sm font-medium dark:text-white text-red-600", children: [_jsx("div", { children: getMsg(msg, "nonFieldErrors") }), _jsx("div", { children: getMsg(msg, "detail") })] }), _jsxs("div", { className: "flex flex-row-reverse justify-between items-center", children: [_jsx(MyButton, { onClick: onClickSubmit, isLoading: isLoading, label: "Save" }), !hasDelete ? (_jsx(MyButton, { onClick: onClickSubmitAdd, isLoading: isLoading, label: "Save and Add" })) : (_jsx(MyIcon, { icon: "Delete", fontSize: "large", onClick: onClickDelete }))] })] }));
});
