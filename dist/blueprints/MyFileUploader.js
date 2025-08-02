import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { MyIcon } from "./MyIcon";
export const MyFileUploader = (props) => {
    const { value, onChangeValue } = props;
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;
    const [image, setImage] = useState(value && imageExtensions.test(String(value)) ? String(value) : "");
    const [nonImageFile, setNonImageFile] = useState(value && !imageExtensions.test(String(value)) ? String(value) : "");
    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target.files?.[0];
            if (file) {
                if (file.type.startsWith("image/")) {
                    setImage(URL.createObjectURL(e.target.files[0]));
                    setNonImageFile("");
                }
                else {
                    setImage("");
                    setNonImageFile(URL.createObjectURL(e.target.files[0]));
                }
            }
            onChangeValue?.(e.target.files[0]);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center w-full px-10", children: _jsxs("label", { className: "flex flex-col items-center justify-center w-32 h-32 border-2 border-teal-300 rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-teal-500 dark:hover:bg-gray-600", children: [image !== "" ? (_jsx("img", { src: image, className: "rounded-full object-cover h-32 w-32" })) : nonImageFile === "" ? (_jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [_jsx(MyIcon, { icon: "CloudUpload", fontSize: "large", color: "action" }), _jsx("p", { className: "mb-2 text-sm text-gray-500 dark:text-gray-400", children: _jsx("span", { className: "font-semibold", children: "Click to upload" }) })] })) : (_jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [_jsx(MyIcon, { icon: "FilePresent", fontSize: "large", color: "action" }), _jsx("p", { className: "mb-2 text-sm text-gray-500 dark:text-gray-400", children: _jsx("a", { className: "font-semibold", href: nonImageFile, target: "_blank", rel: "noopener noreferrer", children: "Uploaded File" }) })] })), _jsx("input", { type: "file", className: "hidden", onChange: handleFileChange })] }) }));
};
