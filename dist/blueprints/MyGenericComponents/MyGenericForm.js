import { jsx as _jsx } from "react/jsx-runtime";
import moment from "moment";
import { useState } from "react";
import { toTitleCase } from "../../constants/helpers";
import { MyForm } from "../MyForm";
export function MyGenericForm({ item, setVisible, fetchFcn, fields, objectName, store, dateFields = [], datetimeFields = [], timeFields = [], }) {
    const title = item?.id
        ? `Edit ${toTitleCase(objectName)}`
        : `${toTitleCase(objectName)} Creation Form`;
    const transformFrom = (raw) => {
        const copy = { ...raw };
        dateFields.forEach((k) => {
            if (copy[k])
                copy[k] = moment(copy[k]).format("MMM D, YYYY");
        });
        datetimeFields.forEach((k) => {
            if (copy[k])
                copy[k] = moment(copy[k]).format("MMM D YYYY h:mm A");
        });
        timeFields.forEach((k) => {
            if (copy[k])
                copy[k] = moment(copy[k], "HH:mm:ss").format("h:mm A");
        });
        return copy;
    };
    const transformTo = (raw) => {
        const copy = { ...raw };
        dateFields.forEach((k) => {
            const val = copy[k];
            if (val === "") {
                copy[k] = null;
            }
            else if (val) {
                copy[k] = moment(val, "MMM D, YYYY").format("YYYY-MM-DD");
            }
        });
        datetimeFields.forEach((k) => {
            const val = copy[k];
            if (val === "") {
                copy[k] = null;
            }
            else if (val) {
                copy[k] = moment(val, "MMM D YYYY h:mm A").toISOString();
            }
        });
        timeFields.forEach((k) => {
            const val = copy[k];
            if (val === "") {
                copy[k] = null;
            }
            else if (val) {
                copy[k] = moment(val, "h:mm A").format("HH:mm:ss");
            }
        });
        return copy;
        // cleanObject(copy as Record<string, any>) as T;
    };
    const [details, setDetails] = useState(() => item ? transformFrom(item) : {});
    const [msg, setMsg] = useState();
    const [isLoading, setLoading] = useState(false);
    const onClickCreate = async () => {
        setLoading(true);
        const resp = await store.addItem(transformTo(details));
        setLoading(false);
        if (!resp.ok)
            return setMsg(resp.details);
        fetchFcn?.();
        setVisible?.(false);
    };
    const onClickCreateAdd = async () => {
        setLoading(true);
        const resp = await store.addItem(transformTo(details));
        setLoading(false);
        if (!resp.ok)
            return setMsg(resp.details);
        fetchFcn?.();
        setDetails(transformFrom({}));
    };
    const onClickEdit = async () => {
        if (!item?.id)
            return;
        setLoading(true);
        const resp = await store.updateItem(item.id, transformTo(details));
        setLoading(false);
        if (!resp.ok)
            return setMsg(resp.details);
        fetchFcn?.();
        setVisible?.(false);
    };
    const onClickDelete = async () => {
        if (!item?.id)
            return;
        setLoading(true);
        const resp = await store.deleteItem(item.id);
        setLoading(false);
        if (!resp.ok)
            return setMsg(resp.details);
        fetchFcn?.();
        setVisible?.(false);
    };
    return (_jsx("div", { className: "items-center", children: _jsx(MyForm, { fields: fields, title: title, details: details, setDetails: setDetails, onClickSubmit: item?.id ? onClickEdit : onClickCreate, onClickSubmitAdd: onClickCreateAdd, hasDelete: !!item?.id, onDelete: onClickDelete, msg: msg, isLoading: isLoading }) }));
}
