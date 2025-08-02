import { jsx as _jsx } from "react/jsx-runtime";
export const MyPage = (props) => {
    const { children } = props;
    return (_jsx("div", { className: "py-5 px-5", children: _jsx("div", { className: "bg-white min-h-[calc(80vh)] dark:bg-gray-900 px-8 py-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-full sm:rounded-lg sm:px-10", children: children }) }));
};
