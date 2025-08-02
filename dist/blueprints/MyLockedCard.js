import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MyLockedCard = (props) => {
    const { children, isUnlocked } = props;
    return isUnlocked ? (_jsx("div", { children: children })) : (_jsxs("div", { className: "pointer-events-none select-none", onClick: (e) => e.stopPropagation(), children: [children, _jsx("div", { className: "absolute inset-0 bg-transparent z-10" })] }));
};
