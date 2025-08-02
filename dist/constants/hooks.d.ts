import { CalendarView, KeyboardCodes, StateSetter } from "./interfaces";
import moment from "moment";
export declare const useKeyPress: (keys: KeyboardCodes[], callbackFcn: () => void) => void;
export declare const useFilterParams: (keys: string[], callbackFcn: () => void) => void;
export declare const useWindowWidth: () => number;
export declare function useSettings<T>(settingStore: any, defaultValue: T, key: string): readonly [T, import("react").Dispatch<import("react").SetStateAction<T>>];
export type VisibleMap = Record<number, boolean>;
export type Index = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type UseVisibleMapReturn = {
    isVisible: VisibleMap;
    toggleVisible: (key: number) => void;
    setVisible: (key: number, value: boolean) => void;
} & {
    [K in Index as `setVisible${K}`]: StateSetter<boolean>;
} & {
    [K in Index as `isVisible${K}`]: boolean;
};
/**
 * useVisibleMap - Custom hook to manage multiple visibility states (1 to count).
 *
 * @param count - Positive integer. The hook creates keys 1 to `count`, each mapped to a boolean.
 *
 * @returns An object containing:
 * - `visible`: Record<number, boolean> — the visibility state of each key.
 * - `setVisible(key, value)`: Set a specific key's visibility.
 * - `toggleVisible(key)`: Toggle a specific key's visibility.
 * - `setVisible1`, `setVisible2`, ..., `setVisibleN`: Direct setters for each key for cleaner usage.
 *
 * Example:
 * const { visible, setVisible1, toggleVisible } = useVisibleMap(4);
 * setVisible1?.(true);       // Sets visible[1] = true
 * toggleVisible(2);          // Toggles visible[2]
 *
 * console.log(visible[1]);   // true
 */
export declare function useVisible(): UseVisibleMapReturn;
export declare const useIsUnhoverable: () => boolean;
export declare function useLocalStorageState<T>(defaultValue: T, key: string): readonly [T, import("react").Dispatch<import("react").SetStateAction<T>>];
export declare const useCalendarProps: () => {
    date: Date;
    setDate: import("react").Dispatch<import("react").SetStateAction<Date>>;
    view: CalendarView;
    setView: import("react").Dispatch<import("react").SetStateAction<CalendarView>>;
    range: string;
    start: moment.Moment;
    end: moment.Moment;
};
export type CalendarProps = ReturnType<typeof useCalendarProps>;
