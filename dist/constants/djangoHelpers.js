import { prop } from "mobx-keystone";
const DjangoFields = {
    DefaultBooleanField: prop(false),
    FileField: prop(null),
    CascadeOptionalForeignKey: prop(null),
    OptionalOneToOneField: prop(null),
    OptionalSetNullOneToOneField: prop(null),
    AmountField: prop(-1),
    CascadeRequiredForeignKey: prop(-1),
    ChoiceIntegerField: prop(-1),
    DecimalField: prop(-1),
    ForeignKey: prop(-1),
    LimitedDecimalField: prop(-1),
    LimitedIntegerField: prop(-1),
    OneToOneField: prop(-1),
    OptionalLimitedDecimalField: prop(-1),
    SetNullOptionalForeignKey: prop(-1),
    OptionalManyToManyField: prop(null),
    ChoicesNumberArrayField: prop(() => []),
    ManyToManyField: prop(() => []),
    NumberArrayField: prop(() => []),
    OptionalDateField: prop(null),
    OptionalDateTimeField: prop(null),
    OptionalLimitedTimeField: prop(null),
    AutoCreatedAtField: prop(""),
    AutoUpdatedAtField: prop(""),
    ColorField: prop(""),
    DefaultNowField: prop(""),
    DefaultTodayField: prop(""),
    LongCharField: prop(""),
    MediumCharField: prop(""),
    OptionalEmailField: prop(""),
    OptionalURLField: prop(""),
    ShortCharField: prop(""),
    ChoicesStringArrayField: prop(() => []),
    StringArrayField: prop(() => []),
    ID: prop(-1),
};
export function fieldToProps(fields) {
    const result = {};
    for (const key in fields) {
        const { field } = fields[key];
        const propFn = DjangoFields[field];
        result[key] = propFn;
    }
    return result;
}
