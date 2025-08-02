type TimelinePoint = {
    date: string;
    events: number;
};
export declare function fillMissingDatesWithNulls(data: TimelinePoint[], startDate: string, endDate: string): {
    date: string;
    events: number | null;
}[];
export default function MyTimelineChart(): import("react/jsx-runtime").JSX.Element;
export {};
