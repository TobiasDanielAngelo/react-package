import { OptionalModelProp, prop } from "mobx-keystone";
import { Field, Option } from "./interfaces";
import { toTitleCase } from "./helpers";

const DjangoFields = {
  DefaultBooleanField: {
    prop: prop<boolean>(false),
    type: "check",
  },
  FileField: {
    prop: prop<File | null>(null),
    type: "file",
  },
  CascadeOptionalForeignKey: {
    prop: prop<number | null>(null),
    type: "select",
  },
  OptionalOneToOneField: {
    prop: prop<number | null>(null),
    type: "select",
  },
  OptionalSetNullOneToOneField: {
    prop: prop<number | null>(null),
    type: "select",
  },
  AmountField: {
    prop: prop<number>(-1),
    type: "number",
  },
  CascadeRequiredForeignKey: {
    prop: prop<number>(-1),
    type: "select",
  },
  ChoiceIntegerField: {
    prop: prop<number>(-1),
    type: "select",
  },
  DecimalField: {
    prop: prop<number>(-1),
    type: "number",
  },
  ForeignKey: {
    prop: prop<number>(-1),
    type: "select",
  },
  LimitedDecimalField: {
    prop: prop<number>(-1),
    type: "number",
  },
  LimitedIntegerField: {
    prop: prop<number>(-1),
    type: "number",
  },
  OneToOneField: {
    prop: prop<number>(-1),
    type: "select",
  },
  OptionalLimitedDecimalField: {
    prop: prop<number>(-1),
    type: "number",
  },
  SetNullOptionalForeignKey: {
    prop: prop<number>(-1),
    type: "select",
  },
  OptionalManyToManyField: {
    prop: prop<number[] | null>(null),
    type: "multi",
  },
  ChoicesNumberArrayField: {
    prop: prop<number[]>(() => []),
    type: "multi",
  },
  ManyToManyField: {
    prop: prop<number[]>(() => []),
    type: "multi",
  },
  NumberArrayField: {
    prop: prop<number[]>(() => []),
    type: "multi",
  },
  OptionalDateField: {
    prop: prop<string | null>(null),
    type: "date",
  },
  OptionalDateTimeField: {
    prop: prop<string | null>(null),
    type: "datetime",
  },
  OptionalLimitedTimeField: {
    prop: prop<string | null>(null),
    type: "time",
  },
  AutoCreatedAtField: {
    prop: prop<string>(""),
    type: "datetime",
  },
  AutoUpdatedAtField: {
    prop: prop<string>(""),
    type: "datetime",
  },
  ColorField: {
    prop: prop<string>(""),
    type: "color",
  },
  DefaultNowField: {
    prop: prop<string>(""),
    type: "datetime",
  },
  DefaultTodayField: {
    prop: prop<string>(""),
    type: "date",
  },
  LongCharField: {
    prop: prop<string>(""),
    type: "textarea",
  },
  MediumCharField: {
    prop: prop<string>(""),
    type: "text",
  },
  OptionalEmailField: {
    prop: prop<string>(""),
    type: "text",
  },
  OptionalURLField: {
    prop: prop<string>(""),
    type: "text",
  },
  ShortCharField: {
    prop: prop<string>(""),
    type: "text",
  },
  ChoicesStringArrayField: {
    prop: prop<string[]>(() => []),
    type: "multi",
  },
  StringArrayField: {
    prop: prop<string[]>(() => []),
    type: "multi",
  },
  ID: {
    prop: prop<number | string>(-1),
    type: "number",
  },
};

export type DjangoModelField = {
  field: keyof typeof DjangoFields;
  fk?: string;
  choices?: Option[];
  label?: string;
};

type ExtractPropType<F> = F extends OptionalModelProp<infer T> ? T : never;
type FieldTypeToType = {
  [K in keyof typeof DjangoFields]: ExtractPropType<
    (typeof DjangoFields)[K]["prop"]
  >;
};
type FieldsInput = Record<string, DjangoModelField>;
type FieldToProp<F extends FieldsInput> = {
  [K in keyof F]: OptionalModelProp<FieldTypeToType[F[K]["field"]]>;
};

export function fieldToProps<F extends FieldsInput>(fields: F): FieldToProp<F> {
  const result: any = {};

  for (const key in fields) {
    const { field } = fields[key];
    const propFn = (DjangoFields as any)[field]["prop"];
    result[key] = propFn;
  }

  return result;
}

export function fieldToFormField<F extends FieldsInput>(
  fields: F,
  excludedFields?: (keyof F)[]
): Field[][] {
  const result: Field[][] = [];

  for (const key in fields) {
    if (["id", ...(excludedFields ?? [])].includes(key)) {
      continue;
    }
    const { field, choices, label } = fields[key];
    const type = DjangoFields[field].type;
    result.push([
      {
        name: key,
        label: label ?? toTitleCase(key),
        type,
        options: choices ?? [],
      },
    ]);
  }

  return result;
}
