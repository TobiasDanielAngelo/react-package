interface SideBySideViewProps {
    SideA?: React.ReactNode;
    SideB?: React.ReactNode;
    ratio?: number;
    reversed?: boolean;
}
export declare const SideBySideView: (({ SideA, SideB, ratio, reversed }: SideBySideViewProps) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export {};
