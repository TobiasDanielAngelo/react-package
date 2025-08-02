import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toTitleCase } from "../../constants/helpers";
import { useKeyPress, useSettings } from "../../constants/hooks";
import { MyIcon } from "../MyIcon";
import { MyModal } from "../MyModal";
import { MyMultiDropdownSelector } from "../MyMultiDropdownSelector";
import { MyPageBar } from "../MyPageBar";
import { MySpeedDial } from "../MySpeedDial";
export const useViewValues = (settingStore, name, obj, graphs = ["pie", "line"]) => {
    const [pageDetails, setPageDetails] = useState();
    const [params, setParams] = useSearchParams();
    const availableGraphs = graphs;
    const objWithFields = obj.$view;
    const [graph, setGraph] = useSettings(settingStore, "pie", `graph${name}`);
    const [shownFields, setShownFields] = useSettings(settingStore, Object.keys(objWithFields), `shownFields${name}`);
    const [sortFields, setSortFields] = useSettings(settingStore, [], `sortFields${name}`);
    return {
        pageDetails,
        setPageDetails,
        params,
        setParams,
        availableGraphs,
        graph,
        setGraph,
        shownFields,
        setShownFields,
        sortFields,
        setSortFields,
        objWithFields,
    };
};
export const MyGenericView = observer((props) => {
    const { fetchFcn, Context, CollectionComponent, TableComponent, FormComponent, FilterComponent, objWithFields, actionModalDefs, isVisible, setVisible, shownFields, setShownFields, availableGraphs, pageDetails, setPageDetails, params, setParams, itemMap, sortFields, setSortFields, graph, setGraph, title, related, useStore, } = props;
    const { settingStore } = useStore();
    const setVisibleForIndex = (index) => {
        return (value) => {
            setVisible(index, value); // Use setVisible with the given index
        };
    };
    const defaultActionModalDefs = [
        {
            icon: "NoteAdd",
            label: "NEW",
            name: `Add ${title}`,
            modal: (_jsx(FormComponent, { fetchFcn: fetchFcn, setVisible: setVisibleForIndex(1) })),
        },
        {
            icon: "ViewList",
            label: "FIELDS",
            name: "Show Fields",
            modal: (_jsx(MyMultiDropdownSelector, { label: "Fields", value: shownFields, onChangeValue: (t) => setShownFields(t), options: Object.keys(objWithFields).map((s) => ({
                    id: s,
                    name: toTitleCase(s),
                })), relative: true, open: true })),
        },
        {
            icon: "FilterListAlt",
            label: "FILTERS",
            name: "Filters",
            modal: _jsx(FilterComponent, {}),
        },
    ];
    const graphIconMap = availableGraphs.reduce((acc, type) => {
        const iconMap = {
            pie: { icon: "PieChart", label: "PIE" },
            line: { icon: "Timeline", label: "LINE" },
            bar: { icon: "BarChart", label: "BAR" },
            area: { icon: "InsertChart", label: "AREA" },
        };
        acc[type] = iconMap[type];
        return acc;
    }, {});
    const [view, setView] = useSettings(settingStore, "table", `view${title.replace(" ", "")}`);
    const toggleView = () => {
        setView((prev) => (prev === "card" ? "table" : "card"));
    };
    const toggleGraph = () => {
        setGraph((prev) => {
            const currentIndex = availableGraphs.indexOf(prev);
            const nextIndex = (currentIndex + 1) % availableGraphs.length;
            return availableGraphs[nextIndex];
        });
    };
    const updatePage = (updateFn) => {
        setParams((t) => {
            const p = new URLSearchParams(t);
            const curr = Number(p.get("page")) || 1;
            p.set("page", String(updateFn(curr)));
            return p;
        });
    };
    const PageBar = () => (_jsx(MyPageBar, { pageDetails: pageDetails, onClickPrev: () => updatePage((curr) => Math.max(curr - 1, 1)), onClickNext: () => updatePage((curr) => Math.min(curr + 1, pageDetails?.totalPages ?? curr)), onClickPage: (n) => updatePage(() => n), title: title }));
    const Modals = [...defaultActionModalDefs, ...(actionModalDefs ?? [])]
        .map((s) => s.modal)
        .map((child, i) => (_jsx(MyModal, { isVisible: isVisible[i + 1], setVisible: (v) => setVisible(i + 1, typeof v === "function" ? v(isVisible[i + 1]) : v), disableClose: true, children: child }, i)));
    const views = useMemo(() => [
        {
            icon: view === "card" ? (_jsx(MyIcon, { icon: "Padding", label: "CARD" })) : (_jsx(MyIcon, { icon: "TableChart", label: "TABLE" })),
            name: "Toggle View",
            onClick: toggleView,
        },
        {
            icon: (_jsx(MyIcon, { ...(graphIconMap[graph] ?? { icon: "Help", label: "UNKNOWN" }) })),
            name: "Toggle Graphs",
            onClick: toggleGraph,
        },
    ], [view, graph]);
    const actions = useMemo(() => [...defaultActionModalDefs, ...(actionModalDefs ?? [])].map((def, i) => ({
        icon: _jsx(MyIcon, { icon: def.icon, fontSize: "large", label: def.label }),
        name: def.name,
        onClick: () => setVisible(i + 1, true),
    })), [setVisible, actionModalDefs, defaultActionModalDefs]);
    actions.forEach((s, ind) => useKeyPress(["Alt", `Digit${ind + 1}`], s.onClick));
    useEffect(() => {
        fetchFcn();
    }, [params]);
    const value = {
        shownFields,
        setShownFields,
        params,
        setParams,
        pageDetails,
        setPageDetails,
        PageBar,
        fetchFcn,
        itemMap,
        graph,
        sortFields,
        setSortFields,
        related,
    };
    return (_jsxs(Context.Provider, { value: value, children: [view === "card" ? _jsx(CollectionComponent, {}) : _jsx(TableComponent, {}), Modals, _jsx(MySpeedDial, { actions: actions }), _jsx(MySpeedDial, { actions: views, leftSide: true })] }));
});
