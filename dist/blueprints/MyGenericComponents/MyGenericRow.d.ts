interface MyGenericRowProps<T> {
    item: T;
    FormComponent: React.ComponentType<{
        item: T;
        setVisible: (v: boolean) => void;
        fetchFcn: () => void;
    }>;
    deleteItem: (id: number | string) => Promise<{
        ok: boolean;
        details?: string;
    }>;
    fetchFcn: () => void;
}
export declare const MyGenericRow: (<T extends object & {
    id: number | string;
}>({ item, FormComponent, deleteItem, fetchFcn, }: MyGenericRowProps<T>) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export {};
