import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { MyIcon } from "./MyIcon";
export const MyImageUploader = (props) => {
    const { value, onChangeValue } = props;
    const [image, setImage] = useState(value ? `${value}` : "");
    const handleFileChange = (e) => {
        if (e.target.files) {
            onChangeValue?.(e.target.files[0]);
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center w-full px-10", children: _jsxs("label", { className: "flex flex-col items-center justify-center w-32 h-32 border-2 border-teal-300 rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-teal-500 dark:hover:bg-gray-600", children: [image !== "" ? (_jsx("img", { src: image, className: "rounded-full object-cover h-32 w-32" })) : (_jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [_jsx(MyIcon, { icon: "CloudUpload", fontSize: "large", color: "action" }), _jsx("p", { className: "mb-2 text-sm text-gray-500 dark:text-gray-400", children: _jsx("span", { className: "font-semibold", children: "Click to upload" }) })] })), _jsx("input", { type: "file", className: "hidden", onChange: handleFileChange })] }) }));
};
