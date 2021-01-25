declare const Endpoints: Readonly<{
    guard: (value: string) => value is "Activities" | "Steps" | "HeartRate" | "Sleep" | "SleepData";
    check: (value: string) => "Activities" | "Steps" | "HeartRate" | "Sleep" | "SleepData";
    values: ("Activities" | "Steps" | "HeartRate" | "Sleep" | "SleepData")[];
} & {
    type: "Activities" | "Steps" | "HeartRate" | "Sleep" | "SleepData";
}>;
declare type Endpoints = typeof Endpoints.type;
export default Endpoints;
//# sourceMappingURL=Endpoints.d.ts.map