import { fromSnapshotOverrideTypeSymbol, MaybeOptionalModelProp, Model, ModelClass, modelIdPropertyNameSymbol, ModelProps, propsTypeSymbol, toSnapshotOverrideTypeSymbol } from "mobx-keystone";
import { PropsToInterface } from "../constants/interfaces";
import { Related } from ".";
export type LoginInterface = {
    username: string;
    password: string;
};
type KeystoneModel<U> = {
    id: number | string | null;
    $view: Required<U>;
    update: (details: Partial<U>) => void;
};
export type NullableProps<T> = {
    [K in keyof T]: T[K] | null;
};
export declare function MyModel<TProps extends ModelProps, TView>(slug: string, props: TProps, derivedProps?: (self: any) => TView): ModelClass<InstanceType<ReturnType<typeof Model<TProps>>> & KeystoneModel<PropsToInterface<TProps> & TView> & TView>;
type EverythingPublic<T> = Pick<T, {
    [K in keyof T]: K extends string ? T[K] extends (...args: any) => any | object | number | string | boolean | null | undefined ? K : never : never;
}[keyof T]>;
export declare function MyStore<T extends KeystoneModel<{
    id?: number | string | null;
}>>(ModelClass: {
    new (...args: any[]): T;
}, baseURL: string, slug: string, resetOnFetch?: boolean): new () => EverythingPublic<{
    onInit(): void;
    onAttachedToRootStore(): void;
    readonly allItems: Map<string | number, T>;
    readonly itemsSignature: string;
    setSubscription: (this: /*elided*/ any, state: boolean) => void;
    fetchAll: (params?: string) => Promise<any>;
    checkUpdated: (lastUpdated: string) => Promise<{
        details: any;
        ok: boolean;
        data: any;
    }>;
    fetchUpdated: () => Promise<any>;
    addItem: (details: NullableProps<Partial<T>>) => Promise<{
        details: any;
        ok: boolean;
        data: any;
    } | {
        details: string;
        ok: boolean;
        data: T;
    }>;
    updateItem: (itemId: string | number, details: NullableProps<Partial<T>>) => Promise<{
        details: any;
        ok: boolean;
        data: any;
    } | {
        details: string;
        ok: boolean;
        data: any;
    }>;
    deleteItem: (itemId: string | number) => Promise<any>;
    authBase: (method: "login" | "reauth" | "logout", credentials?: LoginInterface) => Promise<{
        details: string;
        ok: boolean;
        data: any;
    }>;
    resetItems: (this: /*elided*/ any) => void;
    getRefId(): string | undefined;
    readonly $: {
        items: T[];
        related: Related[];
        relatedFields: string[];
        optionFields: string[];
        dateFields: string[];
        datetimeFields: string[];
        priceFields: string[];
        timeFields: string[];
        isSubscribed: boolean;
        lastUpdated: string;
        latestParam: string;
        countToUpdate: number;
    };
    typeCheck(): import("mobx-keystone").TypeCheckError | null;
    toString(options?: {
        withData?: boolean;
    }): string;
    [propsTypeSymbol]: {
        items: import("mobx-keystone").OptionalModelProp<T[]>;
        related: import("mobx-keystone").OptionalModelProp<Related[]>;
        relatedFields: import("mobx-keystone").OptionalModelProp<string[]>;
        optionFields: import("mobx-keystone").OptionalModelProp<string[]>;
        dateFields: import("mobx-keystone").OptionalModelProp<string[]>;
        datetimeFields: import("mobx-keystone").OptionalModelProp<string[]>;
        priceFields: import("mobx-keystone").OptionalModelProp<string[]>;
        timeFields: import("mobx-keystone").OptionalModelProp<string[]>;
        isSubscribed: import("mobx-keystone").OptionalModelProp<boolean>;
        lastUpdated: import("mobx-keystone").OptionalModelProp<string>;
        latestParam: import("mobx-keystone").OptionalModelProp<string>;
        countToUpdate: import("mobx-keystone").OptionalModelProp<number>;
    };
    [fromSnapshotOverrideTypeSymbol]: never;
    [toSnapshotOverrideTypeSymbol]: never;
    [modelIdPropertyNameSymbol]: never;
    readonly $modelType: string;
    $modelId: never;
    related: Related[];
    optionFields: string[];
    relatedFields: string[];
    dateFields: string[];
    datetimeFields: string[];
    priceFields: string[];
    timeFields: string[];
    items: T[];
    isSubscribed: boolean;
    lastUpdated: string;
    latestParam: string;
    countToUpdate: number;
}> & Required<PropsToInterface<{
    items: import("mobx-keystone").OptionalModelProp<T[]>;
    related: import("mobx-keystone").OptionalModelProp<Related[]>;
    relatedFields: import("mobx-keystone").OptionalModelProp<string[]>;
    optionFields: import("mobx-keystone").OptionalModelProp<string[]>;
    dateFields: import("mobx-keystone").OptionalModelProp<string[]>;
    datetimeFields: import("mobx-keystone").OptionalModelProp<string[]>;
    priceFields: import("mobx-keystone").OptionalModelProp<string[]>;
    timeFields: import("mobx-keystone").OptionalModelProp<string[]>;
    isSubscribed: import("mobx-keystone").OptionalModelProp<boolean>;
    lastUpdated: import("mobx-keystone").OptionalModelProp<string>;
    latestParam: import("mobx-keystone").OptionalModelProp<string>;
    countToUpdate: import("mobx-keystone").OptionalModelProp<number>;
}>> & {
    readonly allItems: Map<string | number, T>;
    readonly itemsSignature: string;
    readonly $: {
        items: T[];
        related: Related[];
        relatedFields: string[];
        optionFields: string[];
        dateFields: string[];
        datetimeFields: string[];
        priceFields: string[];
        timeFields: string[];
        isSubscribed: boolean;
        lastUpdated: string;
        latestParam: string;
        countToUpdate: number;
    };
    [propsTypeSymbol]: {
        items: import("mobx-keystone").OptionalModelProp<T[]>;
        related: import("mobx-keystone").OptionalModelProp<Related[]>;
        relatedFields: import("mobx-keystone").OptionalModelProp<string[]>;
        optionFields: import("mobx-keystone").OptionalModelProp<string[]>;
        dateFields: import("mobx-keystone").OptionalModelProp<string[]>;
        datetimeFields: import("mobx-keystone").OptionalModelProp<string[]>;
        priceFields: import("mobx-keystone").OptionalModelProp<string[]>;
        timeFields: import("mobx-keystone").OptionalModelProp<string[]>;
        isSubscribed: import("mobx-keystone").OptionalModelProp<boolean>;
        lastUpdated: import("mobx-keystone").OptionalModelProp<string>;
        latestParam: import("mobx-keystone").OptionalModelProp<string>;
        countToUpdate: import("mobx-keystone").OptionalModelProp<number>;
    };
    readonly $modelType: string;
    related: Related[];
    optionFields: string[];
    relatedFields: string[];
    dateFields: string[];
    datetimeFields: string[];
    priceFields: string[];
    timeFields: string[];
    items: T[];
    isSubscribed: boolean;
    lastUpdated: string;
    latestParam: string;
    countToUpdate: number;
};
export type IStore = InstanceType<ReturnType<typeof MyStore<any>>>;
export declare const functionBinder: (item: any) => void;
type CamelCase<S extends string> = S extends `${infer F}${infer R}` ? `${Lowercase<F>}${R}` : S;
export declare function storesToProps<T extends Record<string, new (...args: any[]) => any>>(classes: T): {
    [K in keyof T as CamelCase<K & string>]: MaybeOptionalModelProp<InstanceType<T[K]>>;
};
export declare function instantiateStores<T extends Record<string, new (...args: any[]) => any>>(classes: T): {
    [K in keyof T as CamelCase<K & string>]: InstanceType<T[K]>;
};
export {};
