import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    isLoading?: boolean;
}
export declare const MyButton: React.FC<ButtonProps>;
export {};
