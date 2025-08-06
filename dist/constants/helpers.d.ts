import { Options, RRule } from "rrule";
import { Option, ScheduleInterface } from "./interfaces";
export declare const posRamp: (x: number) => number;
export declare function kebabToCamel(str: string): string;
export declare function titleToCamel(str: string): string;
export declare const getOrdinal: (n: number) => string;
export declare function getOrdinalName(n: number): string;
export declare function toMoneyShortened(val: number): string;
/**
 * Replaces multiple substrings in a string with a given replacement.
 * Returns '-' if the final string is empty or only whitespace.
 *
 * @param {string} str - The input string.
 * @param {string[]} find - Array of substrings to replace.
 * @param {string} replace - Replacement string.
 * @returns {string} - Modified string or '-' if empty.
 *
 * @example
 * replaceCumulative("Hello, World!", [",", "!"], ""); // "Hello World"
 * replaceCumulative("   ", [" "], "");                // "-"
 */
export declare const replaceCumulative: (str: string, find: string[], replace: string) => string;
export declare const getDateFromSched: (date: Date, sched: number) => Date;
export declare const isSchedIncluded: (dates: Date[], sched: number) => boolean;
export declare const scheduledAmount: (amount: number, dates: Date[], schedule: number) => number;
export declare const areArraysIdentical: (arr1: string[], arr2: string[]) => boolean;
export declare const isSubset: (smallArr: string[], largeArr: string[]) => boolean;
export declare const addDays: (date: Date, days: number) => Date;
export declare const timeDifferenceTime: (startTime: string, endTime: string) => number;
/**
 * Sorts an array of objects by a specified key (assumed to be a date or date-like string).
 *
 * @template T - The type of objects in the array.
 * @param {T[]} arr - The array to sort.
 * @param {keyof T} keyName - The key to sort by.
 * @param {boolean} [decreasing=false] - Whether to sort in descending order.
 * @returns {T[]} - A new sorted array.
 *
 * @example
 * sortByKey(users, "createdAt", true); // Sorts users by createdAt descending
 */
export declare const sortByKey: <T>(arr: T[], keyName: keyof T, decreasing?: boolean) => T[];
/**
 * Converts an array of strings or objects into a standardized `Option[]` format.
 *
 * @template T - The item type (string or object).
 * @param {T[]} items - The input array.
 * @param {keyof T} [keyName] - The key to use as display name (only for object items).
 * @returns {Option[]} - Array of options with `id` and `name`.
 *
 * @example
 * toOptions(["Red", "Green"]);
 * // [{ id: 0, name: "Red" }, { id: 1, name: "Green" }]
 *
 * toOptions(users, "username");
 * // [{ id: 1, name: "johndoe" }, ...]
 */
export declare const toOptions: <T>(items: T[], keyName?: keyof T) => Option[];
export declare const timeDifference: (start: Date | string, end?: Date | string) => string;
/**
 * Converts a string to Title Case, preserving acronyms and numbers.
 *
 * @param {string} [str] - The input string.
 * @returns {string} - The title-cased string.
 *
 * @example
 * toTitleCase("helloWorld")        // "Hello World"
 * toTitleCase("myURL123value")     // "My URL 123 Value"
 * toTitleCase("user_id")           // "User Id"
 * toTitleCase("")                  // ""
 */
export declare const toTitleCase: (str?: string) => string;
export declare const toMoney: (n?: any) => string;
export declare const toHours: (n?: any) => string;
export declare const hoursToWorkDays: (n: number, hoursPerDay?: number) => string;
export declare const handleKeyDown: (e: KeyboardEvent, keys: string[], callback?: () => void) => void;
export declare const rounded: (t: number, numDigits?: number) => number;
export declare const mySum: (numArr?: number[]) => number;
export declare const myProduct: (t: number[]) => number;
export declare const camelCaseToWords: (s: string) => string;
export declare const camelToSnakeCase: (str: string, dunder?: boolean) => string;
export declare const createArrayFromN: (n: number) => number[];
export declare const getDatesFromSched: (dateStart: Date, sched: number, count: number, frequency: number) => Date[];
/**
 * Returns the intersection of two string arrays.
 *
 * @param {string[]} arr1 - First array of strings.
 * @param {string[]} arr2 - Second array of strings.
 * @returns {string[]} - Array of common strings found in both arrays.
 */
export declare const intersectionArrStrs: (arr1: string[], arr2: string[]) => string[];
/**
 * Checks if all parts of the query exist in the target string (case-insensitive).
 *
 * @param {string} str - The target string to search in.
 * @param {string} query - The search query, split by spaces or commas.
 * @returns {boolean} - True if all query parts are found in the string.
 */
export declare const isQueryMatch: (str: string, query: string) => boolean;
export declare const setBlankIfNeg1: (str: string, val: number) => string;
export declare const cmToPx: (cm: number) => number;
export declare const getFirstWords: (str: string, len?: number) => string;
export declare const isDatetimeValue: (val: any) => boolean;
export declare const isDateValue: (val: any) => boolean;
/**
 * Creates a string signature from selected keys of an object.
 *
 * @template T - The object type.
 * @param {T} model - The object to extract values from.
 * @param {(keyof T)[]} keys - Keys whose values will form the signature.
 * @returns {string} - A pipe-separated string of the selected values.
 */
export declare function getModelSignature<T extends {
    [key: string]: any;
}>(model: T, keys: (keyof T)[]): string;
export declare function getStoreSignature<T extends Record<string, any>>(items: T[]): string;
/**
 * Cleans a string by replacing all non-alphanumeric characters with spaces.
 *
 * @param {string} input - The string to clean.
 * @returns {string} - The cleaned string with only letters, numbers, and spaces.
 */
export declare const cleanText: (input: string) => string;
/**
 * Compresses an object into a URI-safe, short string using LZString.
 *
 * @param {object} data - The data object to compress.
 * @returns {string} - A URI-safe compressed string.
 */
export declare const generateShortParam: (data: object) => string;
/**
 * Decompresses and parses a URI-safe compressed string into an object.
 *
 * @param {string | null} param - The compressed string.
 * @returns {Record<string, any>} - The decompressed object, or empty object on error.
 */
export declare const decodeShortParam: (param: string | null) => Record<string, any>;
export declare const months: {
    short: string;
    long: string;
}[];
/**
 * Returns the month name based on a month index (0–11).
 *
 * @param {number} monthNum - The month index (0 = January, 11 = December).
 * @param {"short" | "long"} [type="short"] - Format of the month name.
 * @returns {string} - The corresponding month name or "Invalid" if out of range.
 */
export declare function getMonthName(monthNum: number, type?: "short" | "long"): string;
/**
 * Extracts unique, non-null numeric values from a specified key in an array of objects.
 *
 * @template T - The object type in the array.
 * @template K - The key of T to extract values from.
 * @param {T[]} data - Array of objects to extract from.
 * @param {K} key - The key whose values will be collected.
 * @returns {number[]} - An array of unique numeric values (excluding undefined/null).
 */
export declare const getUniqueIdsFromFK: <T, K extends keyof T>(data: T[], key: K) => number[];
/**
 * Generates a 10-character alphanumeric ID based on the current timestamp and random data.
 * - Uses base36 to keep it compact.
 * - Ensures uniqueness across time and multiple calls.
 */
export declare function generateShortId(): string;
export declare function sortAndFilterByIds<T>(items: T[], ids: (number | string)[], getId: (item: T) => number | string): T[];
export declare const getDescendantIds: (allGoals: {
    parentGoal: number | string;
    id: number | string;
}[], goalId?: number | string) => (number | string)[];
export declare function cleanObject<T extends Record<string, any>>(obj: T): Partial<T>;
/**
 * Converts a local date to a UTC-equivalent Date for RRULE processing.
 * Adjusts by the local timezone offset.
 */
export declare const toUTCForRRule: (date: Date | string | null) => Date | null;
export declare function isValidRRuleOptions(options: Partial<Options>): boolean;
/**
 * Converts a UTC date from RRULE back to local time.
 * Adjusts by adding the local timezone offset.
 */
export declare const fromUTCForRRule: (date: Date | string) => Date;
export declare function buildRRule(schedule: ScheduleInterface): RRule | null;
export declare function generateCollidingDates(sched: ScheduleInterface, window?: {
    startDate: Date;
    endDate: Date;
}): Date[];
export declare function rruleToDetailedText(rule: RRule): string;
export declare function generateScheduleDefinition(sched: ScheduleInterface): string;
export declare function range(a: number, b: number): number[];
export declare function toRoman(num: number): string;
export declare function findByIndex<T>(arr: T[], index: number): T | undefined;
export declare function toSuperscript(n: number | string): string;
export declare function toRomanWithExponents(num: number): string;
