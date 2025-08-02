import { KV } from "./interfaces";
export declare function isValidJSON(str: string): boolean;
export declare function prettifyJSON(str: string): string;
export declare const formatValue: (value: any, key: string, prices?: string[], kv?: KV<any>, arrayIsInfinite?: boolean) => any;
