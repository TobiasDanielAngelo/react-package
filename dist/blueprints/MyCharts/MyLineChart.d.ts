import { MyTrendChartProps } from ".";
/**
 * LineChart Component
 *
 * Displays trends over time (e.g., sales per month).
 *
 * Data shape:
 * [
 *   { name: string; value: number },
 *   ...
 * ]
 *
 * Props:
 * - data: list of time series points
 * - dataKey: key to extract value (e.g., "value")
 *
 * Best for:
 * - Time series data
 * - Performance monitoring
 */
export declare const MyLineChart: (<T extends Record<string, any>>({ data, width, height, colors, traceKey, xKey, yKey, itemMap, related, formatter, excludedFromTotal, selectionLabel, noTotal, title, }: MyTrendChartProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
