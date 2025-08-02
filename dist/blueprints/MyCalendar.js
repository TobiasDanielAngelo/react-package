import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { getStoreSignature, sortByKey } from "../constants/helpers";
import { useVisible, useWindowWidth } from "../constants/hooks";
import { MyIcon } from "./MyIcon";
import { MyModal } from "./MyModal";
import { MyTable } from "./MyTable";
const HourItem = (props) => {
    const { events, modalContent, hour, noCompletion } = props;
    const { isVisible1, setVisible1 } = useVisible();
    return (_jsxs(_Fragment, { children: [_jsx(MyModal, { isVisible: isVisible1, setVisible: setVisible1, title: "Events", children: modalContent }), _jsxs("div", { className: "flex flex-col p-1", onClick: () => setVisible1(true), children: [_jsx("div", { className: "text-xs text-center font-semibold", children: `${hour % 12 === 0 ? 12 : hour % 12}${hour >= 12 ? "P" : "A"}M` }), _jsx("div", { className: "text-center text-xs cursor-pointer font-bold", children: !noCompletion
                            ? `[${String(events?.length)}]`
                            : events?.length
                                ? String(events?.filter((s) => s.dateCompleted).length) +
                                    "/" +
                                    String(events?.length)
                                : "-" })] })] }));
};
const EventItem = (props) => {
    const { label, modalContent, noIcon, title, disabled } = props;
    const { isVisible1, setVisible1 } = useVisible();
    const width = useWindowWidth();
    return (_jsxs(_Fragment, { children: [_jsx(MyModal, { isVisible: isVisible1, setVisible: setVisible1, title: "Events", children: modalContent }), _jsx("span", { onClick: () => setVisible1(true), children: title }), !noIcon && (_jsx(MyIcon, { icon: "Event", fontSize: "small", label: width > 1024 ? label : "", onClick: () => setVisible1(true), disabled: disabled }))] }));
};
export const MyCalendar = observer((props) => {
    const { date, setDate, view, setView, events, noIcon, noCompletion } = props;
    const [currentDate, setCurrentDate] = useState(moment());
    const startDecade = Math.floor(currentDate.year() / 10) * 10;
    useEffect(() => {
        setDate(currentDate.toDate());
    }, [currentDate]);
    const handlePrev = () => {
        const newDate = view === "week"
            ? moment(currentDate).subtract(1, "week")
            : view === "month"
                ? moment(currentDate).subtract(1, "month")
                : view === "year"
                    ? moment(currentDate).subtract(1, "year")
                    : view === "decade"
                        ? moment(currentDate).subtract(10, "year").startOf("year")
                        : moment(currentDate);
        setCurrentDate(newDate);
    };
    const handleNext = () => {
        const newDate = view === "week"
            ? moment(currentDate).add(1, "week").startOf("week")
            : view === "month"
                ? moment(currentDate).add(1, "month").startOf("month")
                : view === "year"
                    ? moment(currentDate).add(1, "year").startOf("year")
                    : view === "decade"
                        ? moment(currentDate)
                            .add(10, "year")
                            .startOf("year")
                            .year(Math.floor(moment(currentDate).year() / 10) * 10 + 10)
                        : moment(currentDate);
        setCurrentDate(newDate);
    };
    const renderWeekView = useCallback(() => {
        const start = moment(currentDate).startOf("week"); // Starting point of the week
        const days = Array.from({ length: 7 }, (_, i) => moment(start).add(i, "day"));
        // Hourly range for the day (0-23, representing 24 hours)
        const hours = Array.from({ length: 24 }, (_, i) => i);
        return (_jsxs("div", { className: "grid grid-cols-7 gap-4 h-[90%] overflow-scroll", children: [["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (_jsx("div", { className: "text-center font-bold", children: d }, d))), days.map((day, i) => {
                    const isToday = day.isSame(moment(), "day");
                    const isSelected = day.isSame(date, "day");
                    // Filter events for the specific day
                    const dayEvents = sortByKey(events, "dateStart").filter((e) => day.format("YYYY-MM-DD") ===
                        moment(e.dateStart).format("YYYY-MM-DD") ||
                        day.format("YYYY-MM-DD") ===
                            moment(e.dateEnd).format("YYYY-MM-DD"));
                    // Group events by hour
                    const eventsByHour = hours.map((hour) => {
                        return dayEvents.filter((e) => moment(e.dateStart).hour() === hour ||
                            moment(e.dateEnd).hour() === hour);
                    });
                    return (_jsxs("div", { className: "flex flex-col", children: [_jsx("div", { onClick: () => setDate(day.toDate()), className: `text-center p-2 rounded cursor-pointer ${isToday ? "text-blue-500 dark:text-white" : ""} ${isSelected ? "bg-teal-300 text-black" : ""}`, children: _jsx("div", { children: day.format("D") }) }), _jsx("div", { className: "grid grid-rows-24 gap-1 text-sm", children: hours.map((hour, index) => {
                                    // Get events for the specific hour
                                    const hourlyEvents = eventsByHour[index];
                                    return (_jsx(HourItem, { events: hourlyEvents, hour: hour, modalContent: _jsx(MyTable, { matrix: [
                                                [
                                                    "Event",
                                                    "Time",
                                                    !noCompletion ? "Completed?" : undefined,
                                                ],
                                                ...hourlyEvents.map((s) => [
                                                    s.title,
                                                    moment(s.dateStart).format("h:mm A"),
                                                    !noCompletion ? (_jsx(MyIcon, { icon: s.dateCompleted
                                                            ? "CheckBox"
                                                            : "CheckBoxOutlineBlank" })) : undefined,
                                                ]),
                                            ] }) }, index));
                                }) })] }, i));
                })] }));
    }, [getStoreSignature(events), currentDate, date, events.length]);
    const renderMonthView = useCallback(() => {
        const start = moment(currentDate).startOf("month").startOf("week");
        const days = Array.from({ length: 42 }, (_, i) => moment(start).add(i, "day"));
        return (_jsxs("div", { className: "grid grid-cols-7 gap-4 h-[90%]", children: [["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d, i) => (_jsx("div", { className: `text-center font-bold ${i === 0 || i === 6 ? "text-red-500" : ""}`, children: d }, d))), days.map((day, i) => {
                    const isToday = day.isSame(moment(), "day");
                    const isSelected = day.isSame(date, "day");
                    const isWeekend = day.day() === 0 || day.day() === 6;
                    const dayEvents = sortByKey(events, "dateStart").filter((e) => day.format("YYYY-MM-DD") ===
                        moment(e.dateStart).format("YYYY-MM-DD"));
                    return (_jsx("div", { onClick: () => setDate(day.toDate()), className: `md:flex-row-reverse text-right text-sm md:text-md items-right justify-between flex flex-col-reverse p-1 md:p-2 rounded cursor-pointer
                ${day.month() === currentDate.month() ? "" : "text-gray-500"}
                ${isWeekend ? "text-red-500" : ""}
                ${isToday ? "text-blue-500 font-bold" : ""}
                ${isSelected ? "bg-teal-300 text-black" : ""}`, children: _jsx(EventItem, { noIcon: noIcon || !dayEvents.length, title: day.date().toString(), label: !noCompletion
                                ? String(dayEvents.filter((s) => s.dateCompleted).length) +
                                    "/" +
                                    String(dayEvents.length)
                                : `[${String(dayEvents.length)}]`, modalContent: _jsx(MyTable, { matrix: [
                                    [
                                        "Event",
                                        "Time",
                                        !noCompletion ? "Completed?" : undefined,
                                    ],
                                    ...sortByKey(dayEvents, "dateStart").map((s) => [
                                        s.title,
                                        moment(s.dateStart).format("h:mm A"),
                                        !noCompletion ? (_jsx(MyIcon, { icon: s.dateCompleted
                                                ? "CheckBox"
                                                : "CheckBoxOutlineBlank" })) : undefined,
                                    ]),
                                ] }) }) }, i));
                })] }));
    }, [getStoreSignature(events), currentDate, date, events.length]);
    const renderYearView = () => (_jsx("div", { className: "grid grid-cols-3 gap-2 h-full", children: Array.from({ length: 12 }, (_, i) => (_jsx("div", { onClick: () => {
                setCurrentDate(moment(currentDate).month(i));
                setView("month");
            }, className: "p-4 text-center rounded shadow cursor-pointer dark:hover:bg-gray-500 hover:bg-teal-200", children: moment().month(i).format("MMM") }, i))) }));
    const renderDecadeView = () => (_jsx("div", { className: "grid grid-cols-3 gap-5 h-[90%]", children: Array.from({ length: 12 }, (_, i) => startDecade - 1 + i).map((year) => (_jsx("div", { onClick: () => {
                setCurrentDate(moment(currentDate).year(year));
                setView("year");
            }, className: `p-4 text-center rounded cursor-pointer shadow ${year === currentDate.year() ? "bg-blue-400" : ""}`, children: year }, year))) }));
    return (_jsxs("div", { className: "p-4 rounded-xl h-full", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("div", { onClick: handlePrev, children: _jsx(MyIcon, { icon: "KeyboardArrowLeft", fontSize: "large" }) }), _jsxs("div", { onClick: () => setView(view === "week"
                            ? "month"
                            : view === "month"
                                ? "year"
                                : view === "year"
                                    ? "decade"
                                    : "week"), className: "font-bold cursor-pointer", children: [view === "week" &&
                                `${currentDate.format("YYYY")} Week ${currentDate.week()} (${currentDate
                                    .startOf("week")
                                    .format("MMM D")} - ${currentDate
                                    .endOf("week")
                                    .format("MMM D")})`, view === "month" && currentDate.format("MMMM YYYY"), view === "year" && currentDate.format("YYYY"), view === "decade" && `${startDecade} - ${startDecade + 9}`] }), _jsx("div", { onClick: handleNext, children: _jsx(MyIcon, { icon: "KeyboardArrowRight", fontSize: "large" }) })] }), view === "week" && renderWeekView(), view === "month" && renderMonthView(), view === "year" && renderYearView(), view === "decade" && renderDecadeView()] }));
});
