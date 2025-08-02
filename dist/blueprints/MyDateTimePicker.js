import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Datetime from "react-datetime";
import "../react-datetime.css";
import { MyIcon } from "./MyIcon";
import moment from "moment";
export const MyDateTimePicker = (props) => {
    const { value, onChangeValue, isDateOnly, isTimeOnly, label, dateFormat, msg, } = props;
    return (_jsxs("div", { children: [_jsx("label", { className: "text-xs text-blue-600", children: label ??
                    `Select${!isTimeOnly ? " Date" : ""}${!isDateOnly && !isTimeOnly ? "/" : " "}${!isDateOnly ? "Time" : ""}` }), _jsxs("div", { className: "flex flex-row", children: [_jsx("div", { className: "flex-1", children: _jsx(Datetime, { value: value, onChange: (d) => {
                                onChangeValue(d);
                            }, dateFormat: isTimeOnly ? false : dateFormat ?? "MMM D, YYYY", timeFormat: isDateOnly ? false : "h:mm A", 
                            // utc={true}
                            inputProps: {
                                placeholder: `Select${!isTimeOnly ? " Date" : ""}${!isDateOnly && !isTimeOnly ? "/" : " "}${!isDateOnly ? "Time" : ""}`,
                                className: "block pb-2.5 px-0 w-full text-center text-sm text-gray-900 bg-transparent border-0 border-b-2 border-teal-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                            } }) }), _jsx(MyIcon, { icon: "Today", onClick: () => {
                            let format = "MMM D, YYYY h:mm A";
                            if (isDateOnly)
                                format = "MMM D, YYYY";
                            else if (isTimeOnly)
                                format = "h:mm A";
                            onChangeValue(moment().format(format));
                        } })] }), _jsx("label", { className: "block text-xs font-medium dark:text-white mb-3 text-red-600", children: msg })] }));
};
