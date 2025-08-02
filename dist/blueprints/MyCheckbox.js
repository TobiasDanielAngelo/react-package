import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MyIcon } from "./MyIcon";
export const MyCheckBox = (props) => {
    const { hidden, label, value, msg, onChangeValue } = props;
    if (hidden)
        return null;
    return (_jsxs("div", { className: "flex flex-col items-left justify-start", children: [_jsx("label", { className: "text-xs text-blue-600", children: label ?? "Select Items" }), _jsx(MyIcon, { icon: value ? "CheckBox" : "CheckBoxOutlineBlank", onClick: () => onChangeValue?.(!value), fontSize: "large" }), msg && (_jsx("label", { className: "block text-xs font-medium dark:text-white mt-1 text-red-600", children: msg }))] }));
};
