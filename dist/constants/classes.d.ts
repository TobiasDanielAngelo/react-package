import moment from "moment";
export declare class DayInPercent {
    num: number;
    constructor(n: number);
    get asDays(): number;
    get asHours(): number;
    get asMinutes(): number;
    get asHumanTime(): string;
    asWorkDays(workingHours: number): string;
    get timeDuration(): moment.Duration;
    get timeHumanized(): string;
}
export declare class TwoDates {
    start: Date;
    end: Date;
    constructor(dt1: string | Date | number | undefined, dt2: string | Date | number | undefined);
    get getRangeString(): string;
    get datesBetween(): Date[];
    get hoursByTimeRegion(): {
        day: number;
        night: number;
    };
    get monthDelta(): number;
    get timeDelta(): moment.Duration;
    get timeDeltaHumanized(): string;
    get isEqualDate(): boolean;
    get isEqualTime(): boolean;
    get earlier(): Date;
    get later(): Date;
    isOverlapWith(td: TwoDates): boolean;
    contains(dt: Date): boolean;
    numberOfSpecifiedDay(dayNum: number): number;
}
