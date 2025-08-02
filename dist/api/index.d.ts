import { PaginatedResponse } from "../constants/interfaces";
export declare function autoFormData(body: Record<string, any>): Record<string, any> | FormData;
export declare function getCookie(name: string): string;
export declare const fetchCSRF: (baseURL: string) => Promise<{
    details: any;
    ok: boolean;
    data: unknown;
}>;
export type Related = {
    id: number | string;
    field: string;
    name: string;
};
export declare function guidedRequest<T>(endpoint: string, options: {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    body?: any;
    itemId?: number | string;
    params?: string;
}, baseURL: string, customURL?: string, hasNoCredentials?: boolean): Promise<{
    details: any;
    ok: boolean;
    data: T | null;
}>;
export declare function fetchItemsRequest<T>(baseURL: string, endpoint: string, params?: string): Promise<{
    details: any;
    ok: boolean;
    data: T[] | null;
    related: Related[] | null;
    optionFields: string[];
    relatedFields: string[];
    dateFields: string[];
    datetimeFields: string[];
    priceFields: string[];
    timeFields: string[];
    pageDetails?: Omit<PaginatedResponse<T>, "results">;
}>;
export declare function postItemRequest<T>(baseURL: string, endpoint: string, body?: T): Promise<{
    details: any;
    ok: boolean;
    data: T;
}>;
export declare function updateItemRequest<T>(endpoint: string, baseURL: string, itemId: number | string, body: T): Promise<{
    details: any;
    ok: boolean;
    data: T;
}>;
export declare function deleteItemRequest(baseURL: string, endpoint: string, itemId: number | string): Promise<{
    details: any;
    ok: boolean;
    data: unknown;
}>;
