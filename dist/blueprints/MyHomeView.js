import { jsx as _jsx } from "react/jsx-runtime";
export const HomeView = (props) => {
    const { children } = props;
    return (_jsx("div", { className: "relative min-h-[calc(88vh)] bg-blue-50 dark:bg-black", children: children }));
};
