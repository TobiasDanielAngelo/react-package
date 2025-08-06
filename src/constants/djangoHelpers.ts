import { OptionalModelProp, prop } from "mobx-keystone";

const DjangoFields = {
  DefaultBooleanField: prop<boolean>(false),
  FileField: prop<File | null>(null),
  CascadeOptionalForeignKey: prop<number | null>(null),
  OptionalOneToOneField: prop<number | null>(null),
  OptionalSetNullOneToOneField: prop<number | null>(null),
  AmountField: prop<number>(-1),
  CascadeRequiredForeignKey: prop<number>(-1),
  ChoiceIntegerField: prop<number>(-1),
  DecimalField: prop<number>(-1),
  ForeignKey: prop<number>(-1),
  LimitedDecimalField: prop<number>(-1),
  LimitedIntegerField: prop<number>(-1),
  OneToOneField: prop<number>(-1),
  OptionalLimitedDecimalField: prop<number>(-1),
  SetNullOptionalForeignKey: prop<number>(-1),
  OptionalManyToManyField: prop<number[] | null>(null),
  ChoicesNumberArrayField: prop<number[]>(() => []),
  ManyToManyField: prop<number[]>(() => []),
  NumberArrayField: prop<number[]>(() => []),
  OptionalDateField: prop<string | null>(null),
  OptionalDateTimeField: prop<string | null>(null),
  OptionalLimitedTimeField: prop<string | null>(null),
  AutoCreatedAtField: prop<string>(""),
  AutoUpdatedAtField: prop<string>(""),
  ColorField: prop<string>(""),
  DefaultNowField: prop<string>(""),
  DefaultTodayField: prop<string>(""),
  LongCharField: prop<string>(""),
  MediumCharField: prop<string>(""),
  OptionalEmailField: prop<string>(""),
  OptionalURLField: prop<string>(""),
  ShortCharField: prop<string>(""),
  ChoicesStringArrayField: prop<string[]>(() => []),
  StringArrayField: prop<string[]>(() => []),
  ID: prop<number | string>(-1),
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

type FieldDef = { field: keyof FieldTypeToType };

type FieldsInput = Record<string, FieldDef>;

type FieldToProp<F extends FieldsInput> = {
  [K in keyof F]: OptionalModelProp<FieldTypeToType[F[K]["field"]]>;
};

export function fieldToProps<F extends FieldsInput>(fields: F): FieldToProp<F> {
  const result: any = {};

  for (const key in fields) {
    const { field } = fields[key];
    const propFn = (DjangoFields as any)[field];
    result[key] = propFn;
  }

  return result;
}
