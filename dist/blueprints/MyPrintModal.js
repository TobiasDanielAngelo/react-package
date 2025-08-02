import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import { MyIcon } from "./MyIcon";
import { MyModal } from "./MyModal";
export const MyPrintModal = (props) => {
    const { pageName, children, isVisible, setVisible } = props;
    const [dims, setDims] = useState({
        width: 0,
        height: 0,
    });
    const { toPDF, targetRef } = usePDF({
        filename: pageName
            ? pageName.substring(pageName.length - 4, pageName.length) === ".pdf"
                ? pageName
                : `${pageName}.pdf`
            : "page.pdf",
        page: {
            format: [dims.width / 4, Math.min(200, dims.height / 4)],
            margin: 3,
        },
    });
    useEffect(() => {
        if (targetRef.current) {
            setDims(targetRef.current.getBoundingClientRect());
        }
    }, [targetRef]);
    return (_jsxs(MyModal, { isVisible: isVisible, setVisible: setVisible, children: [_jsx("div", { ref: targetRef, className: "pb-2 flex justify-center", children: children }), _jsx("div", { className: "flex justify-end", children: _jsx(MyIcon, { icon: "Print", onClick: () => toPDF(), color: "action", fontSize: "large" }) })] }));
};
