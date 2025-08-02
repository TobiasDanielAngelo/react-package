export declare const composedData: {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}[];
/**
 * ComposedChart Component
 *
 * Combines multiple chart types (e.g., line + bar + area).
 *
 * Data shape:
 * [
 *   { name: string; barVal: number; lineVal: number; areaVal: number },
 *   ...
 * ]
 *
 * Props:
 * - data: array of mixed metric items
 * - dataKeys: multiple keys (one per chart type)
 *
 * Best for:
 * - Showing relationships between multiple metrics
 * - Layered analytics
 */
export declare const MyComposedChart: () => import("react/jsx-runtime").JSX.Element;
