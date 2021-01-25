import { StringUnion } from "./StringUnion";

const Endpoints = StringUnion("Activities", "Steps", "HeartRate", "SleepData");
type Endpoints = typeof Endpoints.type;

export default Endpoints;
