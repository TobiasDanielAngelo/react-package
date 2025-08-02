import { MyTrendChartProps } from ".";
/**
 * BarChart Component
 *
 * Compares categories (e.g., expenses by category).
 *
 * Data shape:
 * [
 *   { category: string; count: number },
 *   ...
 * ]
 *
 * Props:
 * - data: list of category items
 * - dataKey: key to extract numeric value (e.g., "count")
 *
 * Best for:
 * - Categorical comparison
 * - Budget breakdowns
 */
export declare const MyBarChart: (<T extends Record<string, any>>({ data, width, height, colors, traceKey, xKey, yKey, itemMap, related, formatter, excludedFromTotal, selectionLabel, title, }: MyTrendChartProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
