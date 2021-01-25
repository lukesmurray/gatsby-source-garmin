import { GarminConnect } from "garmin-connect";
import { GatsbyCache, PluginOptions, Reporter } from "gatsby";
import GarminPluginOptions from "../utils/GarminPluginOptions";
export declare const getHeartRate: ({ cache, pluginOptions, reporter, GCClient, }: {
    cache: GatsbyCache;
    pluginOptions: PluginOptions & GarminPluginOptions;
    reporter: Reporter;
    GCClient: GarminConnect;
}) => Promise<any[]>;
export declare function formatHrId(date: Date): string;
//# sourceMappingURL=getHeartRate.d.ts.map