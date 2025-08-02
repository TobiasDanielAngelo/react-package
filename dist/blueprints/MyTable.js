import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MyTable = (props) => {
    const { matrix, hidden } = props;
    return hidden ? (_jsx(_Fragment, {})) : matrix.length < 2 ? (_jsx("div", { className: "text-center dark:text-white", children: "No entries." })) : (_jsx("div", { className: "relative mt-4 mx-5", children: _jsxs("table", { className: "border-separate border-spacing-0.5 rounded-lg m-auto min-w-[50%] shadow-md sm:rounded-lg overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400", children: [_jsx("thead", { className: "sticky top-0 text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: _jsx("tr", { children: matrix[0].map((s, ind) => (_jsx("th", { scope: "col", className: "px-2 py-1 text-center", children: s }, ind))) }) }), _jsx("tbody", { children: matrix.slice(1).map((s, ind) => (_jsxs("tr", { className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600", children: [_jsx("th", { scope: "row", style: {
                                    whiteSpace: typeof s[0] === "string"
                                        ? s[0].includes(`\n`)
                                            ? "pre-wrap"
                                            : "none"
                                        : "none",
                                    textAlign: typeof s[0] === "string"
                                        ? s[0].includes(`\n`)
                                            ? "left"
                                            : s[0].includes(`\u20b1`)
                                                ? "right"
                                                : "center"
                                        : "left",
                                }, className: "px-6 py-4 font-bold text-gray-900 dark:text-white", children: s[0] }), s.slice(1).map((t, ind) => (_jsx("td", { style: {
                                    whiteSpace: typeof t === "string"
                                        ? t.includes(`\n`)
                                            ? "pre-wrap"
                                            : "none"
                                        : "none",
                                    textAlign: typeof t === "string"
                                        ? t.includes(`\n`)
                                            ? "left"
                                            : t.includes(`\u20b1`)
                                                ? "right"
                                                : "center"
                                        : "left",
                                }, className: "px-6 py-4 justify-between border-solid", children: t }, ind)))] }, ind))) })] }) }));
};
