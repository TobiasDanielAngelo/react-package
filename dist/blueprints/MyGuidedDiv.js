import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { MyToolTip } from "./MyToolTip";
export const GuidedDiv = (props) => {
    const { children, title, className, hidden, onClick } = props;
    const ref = useRef(null);
    return (_jsxs("div", { ref: ref, className: className ?? "text-blue-500 cursor-pointer", onClick: onClick, children: [_jsx(MyToolTip, { parentRef: ref, hidden: hidden, children: title }), children] }));
};
