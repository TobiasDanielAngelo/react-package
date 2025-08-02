type Item<T> = T & {
    id: string | number;
    name: string;
    dueDate: Date;
    importance: number;
};
type Props<T> = {
    items: Item<T>[];
    title?: string;
    width?: string | number;
    height?: string | number;
};
export declare function MyEisenhowerChart<T>({ items, title, width, height, }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
