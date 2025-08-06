import { MaybeOptionalModelProp, Model, ModelClass, ModelProps } from "mobx-keystone";
import { PropsToInterface } from "../constants/interfaces";
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
export declare function MyStore<T extends KeystoneModel<{
    id?: number | string | null;
}>>(ModelClass: {
    new (...args: any[]): T;
}, baseURL: string, slug: string, resetOnFetch?: boolean): any;
export type IStore = InstanceType<ReturnType<typeof MyStore>>;
export declare const functionBinder: (item: any) => void;
type CamelCase<S extends string> = S extends `${infer F}${infer R}` ? `${Lowercase<F>}${R}` : S;
export declare function storesToProps<T extends Record<string, new (...args: any[]) => any>>(classes: T): {
    [K in keyof T as CamelCase<K & string>]: MaybeOptionalModelProp<InstanceType<T[K]>>;
};
export declare function instantiateStores<T extends Record<string, new (...args: any[]) => any>>(classes: T): {
    [K in keyof T as CamelCase<K & string>]: InstanceType<T[K]>;
};
export {};
