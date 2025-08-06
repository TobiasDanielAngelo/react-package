import { format, isValid, parse } from "date-fns";
import LZString from "lz-string";
import moment from "moment";
import { RRule } from "rrule";
export const posRamp = (x) => (x > 0 ? x : 0);
export function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}
export function titleToCamel(str) {
    return str
        .toLowerCase()
        .replace(/(?:^\w|[\s-]\w)/g, (match, offset) => offset === 0 ? match.toLowerCase() : match.trim().toUpperCase())
        .replace(/\s+/g, "");
}
export const getOrdinal = (n) => {
    let ord = "th";
    if (n % 10 == 1 && n % 100 != 11) {
        ord = "st";
    }
    else if (n % 10 == 2 && n % 100 != 12) {
        ord = "nd";
    }
    else if (n % 10 == 3 && n % 100 != 13) {
        ord = "rd";
    }
    return ord;
};
export function getOrdinalName(n) {
    const abs = Math.abs(n);
    let suffix = "th";
    if (abs % 10 === 1 && abs % 100 !== 11)
        suffix = "st";
    else if (abs % 10 === 2 && abs % 100 !== 12)
        suffix = "nd";
    else if (abs % 10 === 3 && abs % 100 !== 13)
        suffix = "rd";
    if (n === -1)
        return "last";
    if (n < -1)
        return `${abs}${suffix} last`;
    return `${abs}${suffix}`;
}
export function toMoneyShortened(val) {
    const value = Math.abs(val);
    const negative = val < 0;
    if (value < 1000)
        return `\u20b1${negative ? "(" + value.toFixed(2) + ")" : value.toFixed(2)}`; // If the value is less than 1000, no need for formatting
    const suffixes = ["", "K", "M", "B", "T"]; // Suffixes for thousands, millions, billions, etc.
    const magnitude = Math.floor(Math.log10(value) / 3); // Determine the magnitude (thousands, millions, etc.)
    const shortValue = value / Math.pow(1000, magnitude); // Scale the number by the appropriate power of 1000
    const formattedValue = `${(Math.round(shortValue * 10) / 10).toFixed(1)}${suffixes[magnitude]}`; // Round to one decimal place and add suffix
    return `\u20b1${negative ? "(" + formattedValue + ")" : formattedValue}`;
}
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
export const replaceCumulative = (str, find, replace) => {
    for (var i = 0; i < find.length; i++)
        str = str.replace(new RegExp(find[i], "g"), replace);
    return str.replace(/\s/g, "") !== "" ? str : "-";
};
export const getDateFromSched = (date, sched) => {
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return new Date(date.getFullYear(), date.getMonth(), Math.min(sched, lastDayOfMonth));
};
export const isSchedIncluded = (dates, sched) => {
    const lastDayOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const day28 = dates.find((s) => s.getDate() === 28);
    return sched <= 28
        ? dates.map((s) => s.getDate()).includes(sched)
        : sched <= 31
            ? !!day28 && lastDayOfMonth(day28.getFullYear(), day28.getMonth()) <= sched
            : sched === 32
                ? !!day28 &&
                    dates
                        .map((s) => s.getDate())
                        .includes(lastDayOfMonth(day28.getFullYear(), day28.getMonth()))
                : true;
};
export const scheduledAmount = (amount, dates, schedule) => {
    return isSchedIncluded(dates, schedule) ? amount : 0;
};
export const areArraysIdentical = (arr1, arr2) => arr2.every((v) => arr1.includes(v)) && arr1.every((v) => arr2.includes(v));
export const isSubset = (smallArr, largeArr) => {
    return smallArr.every((t) => largeArr.includes(t));
};
export const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
export const timeDifferenceTime = (startTime, endTime) => {
    let start = new Date(moment(startTime, "hh:mm A").toISOString());
    let end = new Date(moment(endTime, "hh:mm A").toISOString());
    return end.getTime() > start.getTime()
        ? (end.getTime() - start.getTime()) / (1000 * 60 * 60)
        : 0;
};
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
export const sortByKey = (arr, keyName, decreasing = false) => {
    return arr.slice().sort((a, b) => {
        const aVal = a[keyName];
        const bVal = b[keyName];
        const dateA = new Date(aVal);
        const dateB = new Date(bVal);
        return decreasing
            ? dateB.getTime() - dateA.getTime()
            : dateA.getTime() - dateB.getTime();
    });
};
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
export const toOptions = (items, keyName) => {
    return items.map((item, index) => {
        if (typeof item === "string") {
            return { id: index, name: item };
        }
        else {
            const obj = item;
            return {
                id: obj.id ?? index,
                name: obj[keyName] ?? "",
            };
        }
    });
};
export const timeDifference = (start, end) => {
    let td = new Date(end ?? "").getTime() - new Date(start).getTime();
    return moment(new Date(td)).utc(false).format("H[h] mm[m]");
};
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
export const toTitleCase = (str) => {
    return str
        ? str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+|\b)|[A-Z]?[a-z]+|[0-9]+|[A-Z]/g)
            ?.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
            .join(" ") ?? ""
        : "";
};
export const toMoney = (n) => {
    if (isNaN(n))
        return "";
    if (!isFinite(n))
        return "\u221e";
    return (`\u20b1` +
        (!n
            ? ` —`
            : n > 0
                ? n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "(" +
                    Math.abs(n)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    ")"));
};
export const toHours = (n) => {
    if (isNaN(n))
        return ` \u2013`;
    if (!isFinite(n))
        return "\u221e";
    return !n
        ? ` \u2013`
        : `${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}h`;
};
export const hoursToWorkDays = (n, hoursPerDay) => {
    if (isNaN(n))
        return ` \u2013`;
    if (!isFinite(n))
        return "\u221e";
    return !n
        ? ` \u2013`
        : `${(n / (hoursPerDay ?? 24))
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} work days`;
};
export const handleKeyDown = (e, keys, callback) => {
    if (keys.includes(e.key))
        callback?.();
};
export const rounded = (t, numDigits) => Math.round(t * 10 ** (numDigits ?? 2)) / 10 ** (numDigits ?? 2);
export const mySum = (numArr) => {
    return numArr?.reduce((a, b) => a + b, 0) ?? 0;
};
export const myProduct = (t) => rounded(t.reduce((a, b) => a * b, 1));
export const camelCaseToWords = (s) => {
    const result = s.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
};
export const camelToSnakeCase = (str, dunder) => {
    const matches = [...str.matchAll(/[A-Z]/g)];
    if (!matches.length)
        return str;
    return str.replace(/[A-Z]/g, (letter, index) => {
        const isLast = matches[matches.length - 1].index === index;
        return `${dunder && isLast ? "__" : "_"}${letter.toLowerCase()}`;
    });
};
export const createArrayFromN = (n) => {
    return Array.from(Array(n).keys());
};
export const getDatesFromSched = (dateStart, sched, count, frequency) => {
    return createArrayFromN(count).map((s) => {
        let date = new Date(dateStart);
        date.setMonth(date.getMonth() + s * frequency);
        date.setDate(Math.min(sched, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()));
        return date;
    });
};
/**
 * Returns the intersection of two string arrays.
 *
 * @param {string[]} arr1 - First array of strings.
 * @param {string[]} arr2 - Second array of strings.
 * @returns {string[]} - Array of common strings found in both arrays.
 */
export const intersectionArrStrs = (arr1, arr2) => {
    const setA = new Set(arr1);
    return arr2.filter((value) => setA.has(value));
};
/**
 * Checks if all parts of the query exist in the target string (case-insensitive).
 *
 * @param {string} str - The target string to search in.
 * @param {string} query - The search query, split by spaces or commas.
 * @returns {boolean} - True if all query parts are found in the string.
 */
export const isQueryMatch = (str, query) => {
    return query
        .split(/[ ,]+/)
        .every((v) => str.toLowerCase().includes(v.toLowerCase()));
};
export const setBlankIfNeg1 = (str, val) => {
    return val === -1 ? str : "";
};
export const cmToPx = (cm) => cm / 0.026458;
export const getFirstWords = (str, len = 1) => {
    const words = str.trim().split(/[\s,–—-]+/);
    return words.length > len ? words.slice(0, len).join(" ") + "..." : str;
};
export const isDatetimeValue = (val) => {
    if (val instanceof Date && !isNaN(val.getTime()))
        return true;
    if (typeof val !== "string")
        return false;
    const parsed = Date.parse(val);
    // Ensure it's a valid date and includes time components
    return (!isNaN(parsed) && /\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}/.test(val) // date + time format
    );
};
export const isDateValue = (val) => {
    if (val instanceof Date && !isNaN(val.getTime()))
        return true;
    if (typeof val !== "string")
        return false;
    const parsed = Date.parse(val);
    return (!isNaN(parsed) && /^\d{4}-\d{2}-\d{2}$/.test(val) // exact date format: YYYY-MM-DD
    );
};
/**
 * Creates a string signature from selected keys of an object.
 *
 * @template T - The object type.
 * @param {T} model - The object to extract values from.
 * @param {(keyof T)[]} keys - Keys whose values will form the signature.
 * @returns {string} - A pipe-separated string of the selected values.
 */
export function getModelSignature(model, keys) {
    return keys.map((key) => String(model[key])).join("|");
}
export function getStoreSignature(items) {
    return items
        .map((item) => Object.keys(item)
        .map((key) => String(item[key]))
        .join("|"))
        .join("::");
}
/**
 * Cleans a string by replacing all non-alphanumeric characters with spaces.
 *
 * @param {string} input - The string to clean.
 * @returns {string} - The cleaned string with only letters, numbers, and spaces.
 */
export const cleanText = (input) => {
    return input.replace(/[^a-zA-Z0-9]+/g, " ");
};
/**
 * Compresses an object into a URI-safe, short string using LZString.
 *
 * @param {object} data - The data object to compress.
 * @returns {string} - A URI-safe compressed string.
 */
export const generateShortParam = (data) => {
    return LZString.compressToEncodedURIComponent(JSON.stringify(data));
};
/**
 * Decompresses and parses a URI-safe compressed string into an object.
 *
 * @param {string | null} param - The compressed string.
 * @returns {Record<string, any>} - The decompressed object, or empty object on error.
 */
export const decodeShortParam = (param) => {
    try {
        if (!param || typeof param !== "string")
            throw new Error("Invalid param");
        const json = LZString.decompressFromEncodedURIComponent(param);
        return json ? JSON.parse(json) : {};
    }
    catch (e) {
        console.error("Decoding failed:", e);
        return {};
    }
};
export const months = [
    { short: "Jan", long: "January" },
    { short: "Feb", long: "February" },
    { short: "Mar", long: "March" },
    { short: "Apr", long: "April" },
    { short: "May", long: "May" },
    { short: "Jun", long: "June" },
    { short: "Jul", long: "July" },
    { short: "Aug", long: "August" },
    { short: "Sep", long: "September" },
    { short: "Oct", long: "October" },
    { short: "Nov", long: "November" },
    { short: "Dec", long: "December" },
];
/**
 * Returns the month name based on a month index (0–11).
 *
 * @param {number} monthNum - The month index (0 = January, 11 = December).
 * @param {"short" | "long"} [type="short"] - Format of the month name.
 * @returns {string} - The corresponding month name or "Invalid" if out of range.
 */
export function getMonthName(monthNum, type = "short") {
    const index = monthNum;
    if (index < 0 || index > 11)
        return "Invalid";
    return months[index][type];
}
/**
 * Extracts unique, non-null numeric values from a specified key in an array of objects.
 *
 * @template T - The object type in the array.
 * @template K - The key of T to extract values from.
 * @param {T[]} data - Array of objects to extract from.
 * @param {K} key - The key whose values will be collected.
 * @returns {number[]} - An array of unique numeric values (excluding undefined/null).
 */
export const getUniqueIdsFromFK = (data, key) => {
    return Array.from(new Set(data.map((item) => item[key] ?? -1))).filter((id) => id !== -1);
};
/**
 * Generates a 10-character alphanumeric ID based on the current timestamp and random data.
 * - Uses base36 to keep it compact.
 * - Ensures uniqueness across time and multiple calls.
 */
export function generateShortId() {
    const timePart = Date.now().toString(36); // base36 = time-encoded
    const randomPart = Math.random().toString(36).substring(2, 10); // remove "0."
    return (timePart + randomPart).substring(0, 10); // combine & trim to 10 chars
}
export function sortAndFilterByIds(items, ids, getId) {
    return items
        .filter((item) => ids.includes(getId(item)))
        .sort((a, b) => ids.indexOf(getId(a)) - ids.indexOf(getId(b)));
}
export const getDescendantIds = (allGoals, goalId) => {
    const directChildren = allGoals
        .filter((g) => g.parentGoal === goalId)
        .map((s) => s.id);
    const allDescendants = directChildren.flatMap((c) => getDescendantIds(allGoals, c));
    return [...directChildren, ...allDescendants];
};
const WEEKDAY_MAP = {
    MO: RRule.MO,
    TU: RRule.TU,
    WE: RRule.WE,
    TH: RRule.TH,
    FR: RRule.FR,
    SA: RRule.SA,
    SU: RRule.SU,
};
export function cleanObject(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)));
}
/**
 * Converts a local date to a UTC-equivalent Date for RRULE processing.
 * Adjusts by the local timezone offset.
 */
export const toUTCForRRule = (date) => !date
    ? null
    : moment(new Date(date))
        .add(-new Date().getTimezoneOffset(), "minutes")
        .toDate();
function normalizeDate(dateStr) {
    if (typeof dateStr !== "string") {
        return format(dateStr, "yyyy-MM-dd");
    }
    const formats = ["MMM d, yyyy", "yyyy-MM-dd"];
    for (const fmt of formats) {
        const parsed = parse(dateStr, fmt, new Date());
        if (isValid(parsed))
            return format(parsed, "yyyy-MM-dd");
    }
    try {
        return dateStr;
    }
    catch (_) {
        return "";
    }
}
function normalizeTime(timeStr) {
    if (typeof timeStr !== "string") {
        return format(timeStr, "HH:mm:ss");
    }
    const formats = ["h:mm a", "HH:mm:ss"];
    for (const fmt of formats) {
        const parsed = parse(timeStr, fmt, new Date());
        if (isValid(parsed))
            return format(parsed, "HH:mm:ss");
    }
    try {
        return format(timeStr, "HH:mm:ss");
    }
    catch (_) {
        return "";
    }
}
export function isValidRRuleOptions(options) {
    const allowedFreq = [0, 1, 2, 3, 4, 5, 6]; // YEARLY to SECONDLY
    if (!options)
        return false;
    // FREQ is required
    if (typeof options.freq !== "number" || !allowedFreq.includes(options.freq)) {
        console.warn("Freq issue");
        return false;
    }
    // DTSTART must be a valid Date
    if (!(options.dtstart instanceof Date) || isNaN(options.dtstart.getTime())) {
        console.warn("DTstart issue");
        return false;
    }
    // INTERVAL must be a positive number (optional)
    if (options.interval &&
        (!Number.isInteger(options.interval) || options.interval <= 0)) {
        console.warn("Interval issue");
        return false;
    }
    // COUNT must be a positive integer (optional)
    if (options.count &&
        (!Number.isInteger(options.count) || options.count <= 0)) {
        console.warn("Count issue");
        return false;
    }
    // UNTIL must be a valid Date (optional)
    if (options.until &&
        (!(options.until instanceof Date) || isNaN(options.until.getTime()))) {
        console.warn("Until issue");
        return false;
    }
    return true;
}
/**
 * Converts a UTC date from RRULE back to local time.
 * Adjusts by adding the local timezone offset.
 */
export const fromUTCForRRule = (date) => moment(new Date(date))
    .add(new Date().getTimezoneOffset(), "minutes")
    .toDate();
export function buildRRule(schedule) {
    const startDate = schedule.startDate;
    const startTime = schedule.startTime && schedule.startTime?.length
        ? schedule.startTime
        : "12:00 AM";
    const endDate = schedule.endDate;
    const endTime = schedule.endTime && schedule.endTime?.length
        ? schedule.endTime
        : "11:59 PM";
    const start = !startDate
        ? null
        : `${normalizeDate(startDate)}T${normalizeTime(startTime)}`;
    const end = !endDate
        ? null
        : `${normalizeDate(endDate)}T${normalizeTime(endTime)}`;
    const ruleOptions = {
        freq: schedule.freq ?? RRule.DAILY,
        interval: Number(schedule.interval) || 1,
        byweekday: schedule.byWeekDay
            ?.map((d) => WEEKDAY_MAP[d])
            .filter(Boolean),
        bymonth: schedule.byMonth?.map(Number) ?? undefined,
        bymonthday: schedule.byMonthDay?.map(Number) ?? undefined,
        byyearday: schedule.byYearDay?.map(Number) ?? undefined,
        byweekno: schedule.byWeekNo?.map(Number) ?? undefined,
        byhour: schedule.byHour?.map(Number) ?? undefined,
        byminute: schedule.byMinute?.map(Number) ?? undefined,
        bysecond: schedule.bySecond?.map(Number) ?? undefined,
        bysetpos: schedule.bySetPosition?.map(Number) ?? undefined,
        count: Number(schedule.count) === 0 ? undefined : Number(schedule.count),
        dtstart: toUTCForRRule(start),
        until: toUTCForRRule(end),
    };
    if (!isValidRRuleOptions(ruleOptions)) {
        return null;
    }
    try {
        const rule = new RRule(cleanObject(ruleOptions));
        return rule;
    }
    catch (e) {
        console.error("Failed to build RRule:", e, ruleOptions);
        return null;
    }
}
export function generateCollidingDates(sched, window) {
    const schedule = sched;
    const rule = buildRRule(schedule);
    if (!rule)
        return [];
    return window
        ? rule
            .between(toUTCForRRule(window.startDate) ?? new Date(), toUTCForRRule(window.endDate) ?? new Date())
            .map(fromUTCForRRule)
        : sched.count
            ? rule.all().map(fromUTCForRRule)
            : new RRule({ ...rule.options, count: 5 }).all().map(fromUTCForRRule);
}
export function rruleToDetailedText(rule) {
    const options = rule.options;
    const freqMap = {
        [RRule.DAILY]: "Daily",
        [RRule.WEEKLY]: "Weekly",
        [RRule.MONTHLY]: "Monthly",
        [RRule.YEARLY]: "Yearly",
        [RRule.HOURLY]: "Hourly",
        [RRule.MINUTELY]: "Every minute",
        [RRule.SECONDLY]: "Every second",
    };
    const weekdayMap = {
        0: "Mondays",
        1: "Tuesdays",
        2: "Wednesdays",
        3: "Thursdays",
        4: "Fridays",
        5: "Saturdays",
        6: "Sundays",
    };
    const monthMap = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const freqLabel = freqMap[options.freq] || "Repeats";
    const byDay = options.byweekday?.length > 0
        ? options.byweekday
            .map((d) => weekdayMap[d] || d.toString())
            .join(", ")
        : null;
    const byMonthDay = options.bymonthday?.length
        ? "on the " +
            options.bymonthday.map((t) => `${t}${getOrdinal(t)}`).join(", ") +
            " day"
        : null;
    const byYearDay = options.byyearday?.length
        ? "on day " + options.byyearday.join(", ") + " of the year"
        : null;
    const byWeekNo = options.byweekno?.length
        ? "on week " + options.byweekno.join(", ")
        : null;
    const byMonth = options.bymonth?.length
        ? "in " + options.bymonth.map((m) => monthMap[m] || `Month ${m}`).join(", ")
        : null;
    const hours = options.byhour || [];
    const minutes = options.byminute || [0];
    const bySetPos = options.bysetpos || [];
    const times = [];
    for (const hour of hours) {
        for (const minute of minutes) {
            const timeStr = moment({ hour, minute }).format("h:mm A");
            times.push(timeStr);
        }
    }
    const byTime = times.length > 0 ? `at ${times.join(", ")}` : null;
    const interval = options.interval > 1
        ? `Every ${options.interval} ${freqLabel.toLowerCase() === "daily"
            ? "days"
            : freqLabel.toLowerCase().replace("ly", "") + "s"}`
        : freqLabel;
    const parts = [];
    if (interval)
        parts.push(interval);
    if (byDay) {
        if (bySetPos.length > 0) {
            parts.push(`on the ${bySetPos.map(getOrdinalName).join(", ")} ${byDay}`);
        }
        else {
            parts.push("on " + byDay);
        }
    }
    if (byWeekNo)
        parts.push(byWeekNo);
    if (byMonthDay)
        parts.push(byMonthDay);
    if (byYearDay)
        parts.push(byYearDay);
    if (byMonth)
        parts.push(byMonth);
    if (byTime)
        parts.push(byTime);
    if (options.count) {
        parts.push(`for ${options.count} time${options.count > 1 ? "s" : ""}`);
    }
    else {
        parts.push(`indefinitely`);
    }
    if (options.dtstart) {
        parts.push(`[ ${moment(options.dtstart).format("MMM D, YYYY")} -`);
    }
    if (options.until) {
        parts.push(`until ${moment(options.until).format("MMM D, YYYY")} ]`);
    }
    else {
        parts.push(`]`);
    }
    return parts.join(" ");
}
export function generateScheduleDefinition(sched) {
    const schedule = sched;
    const rule = buildRRule(schedule);
    if (!rule)
        return "";
    return rruleToDetailedText(rule);
}
export function range(a, b) {
    return Array.from({ length: b - a }, (_, i) => i + a);
}
export function toRoman(num) {
    const map = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];
    let result = "";
    for (const [val, roman] of map) {
        while (num >= val) {
            result += roman;
            num -= val;
        }
    }
    return result;
}
export function findByIndex(arr, index) {
    return arr[index];
}
export function toSuperscript(n) {
    const map = {
        "0": "⁰",
        "1": "¹",
        "2": "²",
        "3": "³",
        "4": "⁴",
        "5": "⁵",
        "6": "⁶",
        "7": "⁷",
        "8": "⁸",
        "9": "⁹",
        I: "ᴵ",
        V: "ⱽ",
        X: "ˣ",
        L: "ᴸ",
        C: "ᶜ",
        D: "ᴰ",
        M: "ᴹ",
    };
    return String(n)
        .split("")
        .map((c) => map[c] || "")
        .join("");
}
export function toRomanWithExponents(num) {
    const chunks = [];
    const powers = [
        [1_000_000_000, 4],
        [1_000_000, 3],
        [1000, 2],
    ];
    for (const [divisor, exp] of powers) {
        const part = Math.floor(num / divisor);
        if (part > 0) {
            chunks.push(`${toRoman(part)}M${toSuperscript(toRoman(exp))}`);
            num %= divisor;
        }
    }
    if (num > 0)
        chunks.push(toRoman(num));
    return chunks.join(" ");
}
