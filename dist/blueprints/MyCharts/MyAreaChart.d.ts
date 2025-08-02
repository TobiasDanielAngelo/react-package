import { MyTrendChartProps } from ".";
/**
 * AreaChart Component
 *
 * Visualizes cumulative values (e.g., growth over time).
 *
 * Data shape:
 * [
 *   { period: string; total: number },
 *   ...
 * ]
 *
 * Props:
 * - data: time-based dataset
 * - dataKey: key to extract total value
 *
 * Best for:
 * - Cumulative insights
 * - Revenue trends
 */
export declare const MyAreaChart: (<T extends Record<string, any>>({ data, width, height, colors, traceKey, xKey, yKey, itemMap, related, formatter, excludedFromTotal, selectionLabel, title, }: MyTrendChartProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
