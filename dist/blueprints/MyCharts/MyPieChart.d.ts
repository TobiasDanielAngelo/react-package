import { MyCircleChartProps } from ".";
/**
 * PieChart Component
 *
 * Shows part-to-whole relationships (e.g., budget allocation).
 *
 * Data shape:
 * [
 *   { name: string; value: number },
 *   ...
 * ]
 *
 * Props:
 * - data: list of segments
 * - dataKey: key to extract slice size, i.e. value
 * - nameKey: label to show, i.e. name
 *
 * Best for:
 * - Distribution breakdowns
 */
export declare const MyPieChart: (<T extends Record<string, any>>({ data, width, height, colors, dataKey, nameKey, traceKey, itemMap, related, formatter, selectionLabel, title, }: MyCircleChartProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
