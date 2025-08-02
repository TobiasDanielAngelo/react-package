import { MyTrendChartProps } from ".";
/**
 * RadarChart Component
 *
 * Compares multiple dimensions (e.g., KPI scores).
 *
 * Data shape:
 * [
 *   { subject: string; A: number },
 *   ...
 * ]
 *
 * Props:
 * - data: metric set per subject
 * - dataKey: metric field
 *
 * Best for:
 * - Performance profiles
 * - Category scoring
 */
export declare const MyRadarChart: (<T extends Record<string, any>>({ data, width, height, colors, traceKey, xKey, yKey, itemMap, related, formatter, excludedFromTotal, selectionLabel, title, }: MyTrendChartProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
