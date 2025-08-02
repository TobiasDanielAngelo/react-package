import React from "react";
import { PaginatedDetails } from "../constants/interfaces";
export type MyPageBarProps = {
    pageDetails?: PaginatedDetails;
    onClickNext: () => void;
    onClickPrev: () => void;
    onClickPage: (page: number) => void;
    title: string;
};
export declare const MyPageBar: React.FC<MyPageBarProps>;
