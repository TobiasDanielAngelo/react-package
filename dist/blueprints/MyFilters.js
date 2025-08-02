import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { MyIcon } from "./MyIcon";
import { MySearch } from "./MySearch";
export const MyFilters = (props) => {
    const { children, active, query, setQuery } = props;
    const [open, setOpen] = useState(true);
    const [search, setSearch] = useState(false);
    return (_jsxs("div", { className: "flex flex-col md:flex-row-reverse gap-3", children: [_jsx("div", { className: open ? "" : "absolute right-0 top-0", children: _jsx("div", { className: "flex items-center justify-end cursor-pointer", onClick: () => setOpen((t) => !t), children: !open ? (_jsxs("div", { className: "pr-5 pt-5", children: [_jsx(MyIcon, { icon: "FilterAlt", fontSize: "large" }), _jsx("div", { className: "bg-red-400 rounded-full text-white -mt-3 text-sm ml-5", hidden: !active || active === 0, children: active ?? 0 })] })) : (_jsx(MyIcon, { icon: "VisibilityOff", fontSize: "large" })) }) }), open ? (_jsxs("div", { className: "flex flex-col-reverse md:flex-row-reverse flex-1 gap-3 text-left px-6 pt-4", children: [setQuery ? (_jsx(MySearch, { query: query, setQuery: setQuery, open: search, setOpen: setSearch })) : (_jsx(_Fragment, {})), !search && children] })) : (_jsx(_Fragment, {}))] }));
};
