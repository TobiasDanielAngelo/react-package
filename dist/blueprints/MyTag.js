import { jsx as _jsx } from "react/jsx-runtime";
import { GuidedDiv } from "./MyGuidedDiv";
export const MyTag = (props) => {
    const { label, color, title, hidden } = props;
    return (_jsx("div", { className: "text-center m-1 px-2 py-1 text-xs cursor-pointer font-bold text-white rounded-full", style: {
            backgroundColor: color ?? "skyblue",
            display: hidden ? "none" : "",
        }, children: _jsx(GuidedDiv, { className: "text-white", title: `${label ?? ""}${title ? " - " + title : ""}`, children: label && label.length > 15 ? `${label?.substring(0, 15)}...` : label }) }));
};
