import { GarminConnect } from "garmin-connect";
import { GatsbyCache, PluginOptions, Reporter } from "gatsby";
import GarminPluginOptions from "../utils/GarminPluginOptions";
export declare const getSteps: ({ cache, pluginOptions, reporter, GCClient, }: {
    cache: GatsbyCache;
    pluginOptions: PluginOptions & GarminPluginOptions;
    reporter: Reporter;
    GCClient: GarminConnect;
}) => Promise<any[]>;
export declare function formatStepId(date: Date): string;
//# sourceMappingURL=getSteps.d.ts.map