import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ItemDetails } from "../../blueprints/ItemDetails";
import { useVisible } from "../../constants/hooks";
import { MyConfirmModal } from "../MyConfirmModal";
import { MyIcon } from "../MyIcon";
import { MyModal } from "../MyModal";
export const MyGenericRecursiveCard = observer(({ item, header, important, prices, shownFields, FormComponent, deleteItem, fetchFcn, items, parentKey, border, itemMap = [], related = [], }) => {
    const { isVisible1, setVisible1, isVisible2, setVisible2 } = useVisible();
    const [msg, setMsg] = useState("");
    const subItems = items.filter((g) => g[parentKey] === item.id);
    const [showChildren, setShowChildren] = useState(true);
    const onDelete = async () => {
        const resp = await deleteItem(item?.id ?? -1);
        if (!resp.ok) {
            setMsg(resp.details ?? "Error");
            return;
        }
        setVisible2(false);
    };
    return (_jsxs("div", { className: "m-1 dark:border-gray-700 border-teal-300 rounded-lg p-1", style: { borderWidth: border ? 1 : 0 }, children: [_jsx(MyModal, { isVisible: isVisible1, setVisible: setVisible1, children: _jsx(FormComponent, { item: item, setVisible: setVisible1, fetchFcn: fetchFcn }) }), _jsx(MyConfirmModal, { isVisible: isVisible2, setVisible: setVisible2, onClickCheck: onDelete, actionName: "Delete", msg: msg }), _jsx("div", { className: "flex justify-between", children: _jsx("div", { className: "flex-1", children: _jsxs("div", { className: "flex flex-row", children: [_jsx("div", { className: "text-lg cursor-pointer mx-2 font-mono text-gray-500 flex flex-col justify-between", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(MyIcon, { icon: "Close", onClick: () => setVisible2(true), fontSize: "small" }), _jsx(MyIcon, { icon: "Edit", onClick: () => setVisible1(true), fontSize: "small" }), _jsx(MyIcon, { icon: showChildren ? "ExpandLess" : "ExpandMore", hidden: subItems.length <= 0, onClick: () => setShowChildren((prev) => !prev) })] }) }), _jsx("div", { className: "flex-col w-full", children: _jsx(ItemDetails, { item: item, shownFields: shownFields, header: header, important: important, prices: prices, itemMap: itemMap, related: related }) })] }) }) }), showChildren && subItems.length > 0 && (_jsx("div", { className: "ml-4 mt-2 space-y-2 border-l-2 border-teal-500 dark:border-gray-600 pl-2", children: subItems.map((s) => (_jsx(MyGenericRecursiveCard, { item: s, header: header, important: important, prices: prices, shownFields: shownFields, FormComponent: FormComponent, deleteItem: deleteItem, fetchFcn: fetchFcn, items: items, parentKey: parentKey, related: related, itemMap: itemMap }, s.id))) }))] }));
});
