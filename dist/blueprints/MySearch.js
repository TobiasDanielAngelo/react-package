import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { MyInput } from "./MyInput";
export const MySearch = (props) => {
    const { query, setQuery, open, setOpen } = props;
    return (_jsxs("div", { className: "items-center flex flex-row flex-1 text-left", children: [_jsx(MyInput, { label: "Quick Search", value: query, onChangeValue: setQuery, optional: true, hidden: open ? !open : true }), !open ? (_jsx(SearchIcon, { color: "action", onClick: () => setOpen?.(true) })) : (_jsx(FilterAltIcon, { color: "action", onClick: () => setOpen?.(false) }))] }));
};
