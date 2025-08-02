import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MyPageBar = ({ pageDetails, onClickNext, onClickPrev, onClickPage, title, }) => {
    if (!pageDetails)
        return _jsx(_Fragment, {});
    const { currentPage, totalPages, count } = pageDetails;
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 7;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++)
                pages.push(i);
        }
        else {
            const left = Math.max(2, currentPage - 1);
            const right = Math.min(totalPages - 1, currentPage + 1);
            pages.push(1);
            if (left > 2)
                pages.push("...");
            for (let i = left; i <= right; i++)
                pages.push(i);
            if (right < totalPages - 1)
                pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };
    return (_jsxs("nav", { className: "sticky flex items-center flex-column flex-wrap md:flex-row justify-between m-4", children: [totalPages <= 1 ? (_jsx(_Fragment, {})) : (_jsxs("span", { className: "text-sm text-left font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto", children: ["Page", " ", _jsx("span", { className: "font-semibold text-gray-900 dark:text-white", children: currentPage }), " ", "of", " ", _jsx("span", { className: "font-semibold text-gray-900 dark:text-white", children: totalPages }), " ", "(", count, " items)"] })), _jsx("span", { className: "font-bold dark:text-gray-400", children: title.toUpperCase() }), _jsxs("ul", { className: "inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 cursor-pointer", children: [currentPage === 1 ? (_jsx(_Fragment, {})) : (_jsx("li", { children: _jsx("div", { onClick: onClickPrev, className: "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-teal border border-teal-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white", children: "Prev" }) })), totalPages <= 1 ? (_jsx(_Fragment, {})) : (getPageNumbers().map((item, index) => (_jsx("li", { children: typeof item === "number" ? (_jsx("div", { onClick: () => onClickPage(item), className: `flex items-center justify-center px-3 h-8 leading-tight border border-teal-300 ${item === currentPage
                                ? "text-blue-600 bg-teal-200 hover:bg-white hover:text-teal-700 dark:bg-gray-700 dark:border-gray-700 dark:text-white"
                                : "text-gray-500 bg-teal-100 hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`, children: item })) : (_jsx("span", { className: "flex items-center justify-center px-3 h-8 leading-tight text-gray-400 cursor-default", children: item })) }, index)))), _jsx("li", { children: currentPage >= totalPages ? (_jsx(_Fragment, {})) : (_jsx("div", { onClick: onClickNext, className: "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-teal border border-teal-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white", children: "Next" })) })] })] }));
};
