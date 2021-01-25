import Endpoints from "./Endpoints";

export default interface GarminPluginOptions {
  email: string;
  password: string;
  startDate: number;
  endpoints?: Endpoints[];
  debug?: boolean;
}

export const defaultGarminPluginOptions = {
  endpoints: Endpoints.values,
  debug: false,
};
