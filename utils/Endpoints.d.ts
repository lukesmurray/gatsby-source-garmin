declare const Endpoints: Readonly<{
    guard: (value: string) => value is "Activities" | "Steps" | "HeartRate" | "SleepData";
    check: (value: string) => "Activities" | "Steps" | "HeartRate" | "SleepData";
    values: ("Activities" | "Steps" | "HeartRate" | "SleepData")[];
} & {
    type: "Activities" | "Steps" | "HeartRate" | "SleepData";
}>;
declare type Endpoints = typeof Endpoints.type;
export default Endpoints;
//# sourceMappingURL=Endpoints.d.ts.map