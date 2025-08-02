import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useVisible } from "../../constants/hooks";
import { ItemDetails } from "../ItemDetails";
import { MyConfirmModal } from "../MyConfirmModal";
import { MyDropdownMenu } from "../MyDropdownMenu";
import { MyIcon } from "../MyIcon";
import { MyModal } from "../MyModal";
export const MyGenericCard = observer(({ item, shownFields, header, important, prices, FormComponent, deleteItem, fetchFcn, moreActions, dropdownActions, itemMap, related, }) => {
    const { isVisible1, setVisible1, isVisible2, setVisible2, isVisible3, setVisible3, } = useVisible();
    const [showMore, setShowMore] = useState(false);
    const [msg, setMsg] = useState("");
    const onDelete = async () => {
        const resp = await deleteItem(item.id);
        if (!resp.ok) {
            setMsg(resp.details ?? "Error");
            return;
        }
        fetchFcn();
        setVisible2(false);
    };
    const actions = [
        { onClick: () => setVisible1(true), title: "Edit" },
        { onClick: () => setVisible2(true), title: "Delete" },
        ...(dropdownActions ?? []),
    ];
    return (_jsxs("div", { className: "m-3 dark:border-gray-700 border-teal-300  rounded-lg pt-3 px-2 border", children: [_jsx(MyModal, { isVisible: isVisible1, setVisible: setVisible1, children: _jsx(FormComponent, { item: item, setVisible: setVisible1, fetchFcn: fetchFcn }) }), _jsx(MyConfirmModal, { isVisible: isVisible2, setVisible: setVisible2, onClickCheck: onDelete, actionName: "Delete", msg: msg }), _jsx("div", { className: "flex justify-between", children: _jsxs("div", { className: "flex-1", children: [_jsx(ItemDetails, { item: item.$view, shownFields: shownFields, header: header, important: important, prices: prices, showMore: showMore, setShowMore: setShowMore, itemMap: itemMap, related: related }), _jsxs("div", { className: "flex justify-between mt-2 flex-row-reverse", children: [_jsxs("div", { className: "relative", children: [_jsx(MyIcon, { icon: "Settings", onClick: () => setVisible3(true), fontSize: "small" }), _jsx(MyDropdownMenu, { setOpen: setVisible3, open: isVisible3, actions: actions, margin: 9 })] }), moreActions?.map((s, ind) => (_jsx(MyIcon, { icon: s.icon, onClick: s.onClick, fontSize: "small", color: s.color }, ind))), _jsx(MyIcon, { icon: showMore ? "ExpandLess" : "ExpandMore", onClick: () => setShowMore((t) => !t) })] })] }) })] }));
});
