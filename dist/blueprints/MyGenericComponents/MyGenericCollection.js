import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { sortAndFilterByIds } from "../../constants/helpers";
import { MyIcon } from "../MyIcon";
import { useVisible, useWindowWidth } from "../../constants/hooks";
import { useEffect } from "react";
export const MyGenericCollection = observer((props) => {
    const { PageBar, items, pageDetails, CardComponent, title, updates, onClickUpdate, } = props;
    const { isVisible1, setVisible1 } = useVisible();
    const width = useWindowWidth();
    useEffect(() => {
        setVisible1(true);
    }, [width > 1024]);
    return (_jsxs("div", { className: "flex flex-col overflow-scroll shadow-xl rounded-lg", style: {
            minHeight: isVisible1 ? "85vh" : undefined,
            maxHeight: isVisible1 ? "85vh" : undefined,
        }, children: [_jsxs("div", { className: "flex rounded-md flex-row sticky font-bold top-0 z-10 text-lg border-b-2 dark:border-gray-600 border-teal-400 p-2 text-center bg-teal-100 dark:bg-[#242424]", children: [_jsx(MyIcon, { icon: "RestartAlt", onClick: onClickUpdate, label: String(updates ?? 0) }), _jsx("div", { className: "flex-1", children: title.toUpperCase() }), _jsx(MyIcon, { icon: isVisible1 ? "RemoveRedEye" : "DisabledVisible", onClick: () => setVisible1((t) => !t) })] }), isVisible1 && (_jsxs(_Fragment, { children: [PageBar ? _jsx(PageBar, {}) : _jsx(_Fragment, {}), _jsx("div", { className: "flex-1", children: sortAndFilterByIds(items, pageDetails?.ids ?? items.map((s) => s.id), (s) => s.id).map((s) => (_jsx(CardComponent, { item: s }, s.id))) })] }))] }));
});
