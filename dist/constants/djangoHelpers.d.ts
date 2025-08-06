import { OptionalModelProp } from "mobx-keystone";
declare const DjangoFields: {
    DefaultBooleanField: OptionalModelProp<boolean>;
    FileField: OptionalModelProp<File>;
    CascadeOptionalForeignKey: OptionalModelProp<number>;
    OptionalOneToOneField: OptionalModelProp<number>;
    OptionalSetNullOneToOneField: OptionalModelProp<number>;
    AmountField: OptionalModelProp<number>;
    CascadeRequiredForeignKey: OptionalModelProp<number>;
    ChoiceIntegerField: OptionalModelProp<number>;
    DecimalField: OptionalModelProp<number>;
    ForeignKey: OptionalModelProp<number>;
    LimitedDecimalField: OptionalModelProp<number>;
    LimitedIntegerField: OptionalModelProp<number>;
    OneToOneField: OptionalModelProp<number>;
    OptionalLimitedDecimalField: OptionalModelProp<number>;
    SetNullOptionalForeignKey: OptionalModelProp<number>;
    OptionalManyToManyField: OptionalModelProp<number[]>;
    ChoicesNumberArrayField: OptionalModelProp<number[]>;
    ManyToManyField: OptionalModelProp<number[]>;
    NumberArrayField: OptionalModelProp<number[]>;
    OptionalDateField: OptionalModelProp<string>;
    OptionalDateTimeField: OptionalModelProp<string>;
    OptionalLimitedTimeField: OptionalModelProp<string>;
    AutoCreatedAtField: OptionalModelProp<string>;
    AutoUpdatedAtField: OptionalModelProp<string>;
    ColorField: OptionalModelProp<string>;
    DefaultNowField: OptionalModelProp<string>;
    DefaultTodayField: OptionalModelProp<string>;
    LongCharField: OptionalModelProp<string>;
    MediumCharField: OptionalModelProp<string>;
    OptionalEmailField: OptionalModelProp<string>;
    OptionalURLField: OptionalModelProp<string>;
    ShortCharField: OptionalModelProp<string>;
    ChoicesStringArrayField: OptionalModelProp<string[]>;
    StringArrayField: OptionalModelProp<string[]>;
    ID: OptionalModelProp<string | number>;
};
export type DjangoFieldNames = keyof typeof DjangoFields;
export type DjangoModelField = {
    field: DjangoFieldNames;
    fk?: string;
    choices?: string[];
};
type ExtractPropType<F> = F extends OptionalModelProp<infer T> ? T : never;
type DjangoFieldsMap = typeof DjangoFields;
type FieldTypeToType = {
    [K in keyof DjangoFieldsMap]: ExtractPropType<DjangoFieldsMap[K]>;
};
type FieldDef = {
    field: keyof FieldTypeToType;
};
type FieldsInput = Record<string, FieldDef>;
type FieldToProp<F extends FieldsInput> = {
    [K in keyof F]: OptionalModelProp<FieldTypeToType[F[K]["field"]]>;
};
export declare function fieldToProps<F extends FieldsInput>(fields: F): FieldToProp<F>;
export {};
