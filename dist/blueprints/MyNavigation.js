import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Toolbar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsUnhoverable, useKeyPress } from "../constants/hooks";
import { MyDropdownMenu } from "./MyDropdownMenu";
import { MyIcon } from "./MyIcon";
const drawerWidth = 240;
export const ResponsiveDrawer = observer((props) => {
    const { open, setOpen, paths, useStore } = props;
    const navigate = useNavigate();
    const { userStore } = useStore();
    useKeyPress(["KeyQ", "ShiftLeft"], () => setOpen?.(false));
    return (_jsx("div", { style: { display: "flex" }, children: _jsx(Drawer, { sx: {
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                },
            }, open: open, onClose: setOpen && (() => setOpen(false)), children: _jsxs("div", { className: "bg-teal-100 dark:bg-gray-900 dark:text-gray-400", children: [_jsx(Toolbar, {}), _jsx(List, { children: paths?.map((s, ind) => (_jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { onClick: () => {
                                    navigate(s?.link ?? "/");
                                    setOpen?.(false);
                                }, children: [_jsx(ListItemIcon, {}), _jsx(ListItemText, { primary: s.title, secondary: "" })] }) }, ind))) }), _jsx(List, { children: ["Logout"].map((s, ind) => (_jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { onClick: () => {
                                    userStore.logoutUser();
                                    navigate("/login");
                                    setOpen?.(false);
                                }, children: [_jsx(ListItemIcon, {}), _jsx(ListItemText, { primary: s, secondary: "" })] }) }, ind))) })] }) }) }));
});
const NavLink = ({ page }) => {
    const isTouch = useIsUnhoverable();
    return isTouch ? (_jsx(_Fragment, {})) : (_jsxs("div", { className: "relative group cursor-pointer", children: [page.link ? (_jsx(Link, { to: page.link, className: page.selected
                    ? "dark:text-gray-300 text-teal-900 font-bold"
                    : "dark:text-teal-500 text-teal-500 font-bold", children: page.title })) : (_jsx("span", { className: page.selected
                    ? "dark:text-gray-300 text-teal-900 font-bold"
                    : "dark:text-teal-500 text-teal-500 font-bold", children: page.title })), page.children && page.children?.length > 0 && (_jsx("div", { className: "absolute top-full left-0 z-20 hidden group-hover:block dark:bg-gray-800 bg-teal-100 rounded shadow-lg min-w-[150px] py-2", children: page.children.map((child, idx) => (_jsx(Link, { to: child.link ?? "", className: "block px-4 py-2 text-sm dark:text-white text-teal-700 hover:bg-teal-200 dark:hover:bg-gray-400", children: child.title }, idx))) }))] }));
};
export const MyNavBar = observer((props) => {
    const { title, drawerOpen, setDrawerOpen, profileUrl, paths, useStore } = props;
    const { settingStore } = useStore();
    const navigate = useNavigate();
    const [open2, setOpen2] = useState(false);
    const onClickLogout = async () => {
        navigate("/login");
    };
    const leafPages = paths?.flatMap((p) => {
        const leaves = p.children?.length
            ? p.children.filter((c) => !c.children?.length)
            : [];
        if (p.link) {
            leaves.push({
                title: p.title,
                link: p.link,
            });
        }
        return leaves.length ? leaves : [p];
    });
    return (_jsxs("nav", { className: "relative bg-teal-200 border-teal-200 dark:bg-gray-900", children: [_jsx(ResponsiveDrawer, { useStore: useStore, open: drawerOpen, setOpen: setDrawerOpen, paths: leafPages }), _jsxs("div", { className: "flex flex-wrap items-center justify-between mx-auto p-4", children: [_jsxs("div", { className: "flex items-center space-x-3 rtl:space-x-reverse", children: [_jsx(Link, { to: "/menu", children: _jsx(MyIcon, { icon: "InsertChart", fontSize: "large", className: "text-gray-700 dark:text-gray-100 hover:text-green-700 hover:scale-125 [&:not(hover)]:transition-all hover:transition-all ease-in-out hover:animate-pulse" }) }), _jsx("span", { className: "self-center text-2xl font-semibold whitespace-nowrap dark:text-white", children: title })] }), _jsx("div", { className: "md:w-auto", id: "navbar-default", children: _jsxs("ul", { className: "font-medium flex items-center justify-center md:p-0 mt-4 border border-teal-100 rounded-lg flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700", children: [paths?.map((s, ind) => (_jsx("div", { className: "hidden xl:block", children: _jsx(NavLink, { page: s }) }, ind))), _jsxs("div", { className: "items-center content-center place-items-center place-content-center justify-center justify-items-center", children: [_jsx("img", { className: "w-8 h-8 rounded-full cursor-pointer hidden lg:block", src: profileUrl, onClick: () => setOpen2((t) => !t) }), _jsx(MyDropdownMenu, { setOpen: setOpen2, open: open2, actions: [
                                                ...(leafPages?.map((s) => ({
                                                    title: s.title,
                                                    selected: false,
                                                    onClick: () => {
                                                        navigate(s?.link ?? "/");
                                                        setOpen2(false);
                                                    },
                                                })) ?? []),
                                                {
                                                    title: "Toggle Theme",
                                                    selected: false,
                                                    onClick: settingStore.toggleTheme,
                                                },
                                                {
                                                    title: "Logout",
                                                    selected: false,
                                                    onClick: onClickLogout,
                                                },
                                            ] })] }), _jsx("li", { children: _jsx("div", { className: "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600", onClick: settingStore.toggleTheme, children: _jsx(MyIcon, { icon: settingStore.theme() === "dark" ? "DarkMode" : "LightMode" }) }) }), _jsx("li", { children: _jsx("div", { className: "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600", onClick: setDrawerOpen && (() => setDrawerOpen((t) => !t)), children: _jsx(MyIcon, { icon: "Menu" }) }) })] }) })] })] }));
});
