import { jsx as _jsx } from "react/jsx-runtime";
import { useClickAway } from "@uidotdev/usehooks";
export const MyDropdownMenu = (props) => {
    const { open, actions, setOpen, margin } = props;
    const ref = useClickAway(() => setOpen?.(false));
    return (_jsx("div", { ref: ref, className: `${!open ? "hidden" : ""} absolute -mx-20 my-3 z-10 max-h-[50vh] overflow-scroll text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`, style: {
            marginRight: margin ? `-${margin}rem` : "-5rem",
            marginLeft: margin ? `-${margin}rem` : "-5rem",
        }, children: _jsx("ul", { className: "py-2", children: actions?.map((s, ind) => (_jsx("li", { onClick: s.onClick, children: _jsx("a", { href: s.link, className: "cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white", children: s.title }) }, ind))) }) }));
};
