import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
let colors = ["blue", "green", "red"];
export const MyAnime = () => (_jsx(_Fragment, { children: colors.map((color, i) => (_jsx("div", { style: { color: color }, children: "Hello" }, i))) }));
