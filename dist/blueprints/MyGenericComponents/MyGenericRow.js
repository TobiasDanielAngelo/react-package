import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useVisible } from "../../constants/hooks";
import { MyConfirmModal } from "../MyConfirmModal";
import { MyIcon } from "../MyIcon";
import { MyModal } from "../MyModal";
export const MyGenericRow = observer(({ item, FormComponent, deleteItem, fetchFcn, }) => {
    const { isVisible1, setVisible1, isVisible2, setVisible2 } = useVisible();
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
    return (_jsxs("div", { className: "flex justify-evenly", children: [_jsx(MyModal, { isVisible: isVisible1, setVisible: setVisible1, children: _jsx(FormComponent, { item: item, setVisible: setVisible1, fetchFcn: fetchFcn }) }), _jsx(MyConfirmModal, { isVisible: isVisible2, setVisible: setVisible2, onClickCheck: onDelete, actionName: "Delete", msg: msg }), _jsx(MyIcon, { icon: "Edit", onClick: () => setVisible1(true), fontSize: "small" }), _jsx(MyIcon, { icon: "Close", onClick: () => setVisible2(true), fontSize: "small" })] }));
});
