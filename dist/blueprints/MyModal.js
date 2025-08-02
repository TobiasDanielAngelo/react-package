import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog } from "@mui/material";
import { useClickAway } from "@uidotdev/usehooks";
import { useKeyPress } from "../constants/hooks";
import { MyIcon } from "./MyIcon";
export const MyModal = (props) => {
    const { isVisible, setVisible, children, fullWidth, title, subTitle, disableClose, } = props;
    const ref = useClickAway(() => setVisible(false));
    useKeyPress(["Escape"], () => setVisible(false));
    return (_jsx(Dialog, { onClose: disableClose
            ? (_, reason) => reason !== "backdropClick" ? setVisible(false) : setVisible(true)
            : () => setVisible(false), maxWidth: fullWidth ? false : undefined, open: isVisible, className: "overscroll-contain overflow-hidden", children: _jsxs("div", { ref: ref, className: "dark:bg-gray-900 bg-teal-100 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-rounded-[12px] scrollbar-mx-10 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-900", children: [_jsxs("div", { className: "flex justify-between items-center m-2", children: [_jsxs("div", { children: [_jsx("div", { className: "font-bold leading-tight text-left tracking-tight text-gray-900 dark:text-white", children: title }), _jsx("div", { className: "text-sm text-left tracking-tight text-gray-500 italic", children: subTitle })] }), _jsx(MyIcon, { icon: "Close", onClick: () => setVisible(false) })] }), _jsx("div", { className: "min-w-[300px] max-w-[80vw] min-h-[100px] p-3", children: children })] }) }));
};
