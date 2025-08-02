import { MyCircleChartProps } from ".";
/**
 * RadialBarChart Component
 *
 * Visualizes values in a radial format (circular bars).
 *
 * Data shape:
 * [
 *   { name: string; value: number; fill?: string },
 *   ...
 * ]
 *
 * Props:
 * - data: circular bar segments
 * - dataKey: value to display
 *
 * Best for:
 * - Ranked comparisons (like pie but with bars)
 * - Dashboard KPIs
 */
export declare const MyRadialBarChart: (<T extends Record<string, any>>({ data, dataKey, nameKey, traceKey, itemMap, }: MyCircleChartProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
