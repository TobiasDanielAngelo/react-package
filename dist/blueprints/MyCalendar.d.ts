import { CalendarEvent, CalendarView, StateSetter } from "../constants/interfaces";
export declare const MyCalendar: ((props: {
    date: Date;
    setDate: StateSetter<Date>;
    view: CalendarView;
    setView: StateSetter<CalendarView>;
    events: CalendarEvent[];
    noIcon?: boolean;
    noCompletion?: boolean;
}) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
