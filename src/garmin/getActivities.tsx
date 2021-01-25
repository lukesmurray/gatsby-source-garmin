import compareAsc from "date-fns/compareAsc";
import { GarminConnect } from "garmin-connect";
import { GatsbyCache, PluginOptions, Reporter } from "gatsby";
import GarminPluginOptions from "../utils/GarminPluginOptions";
import Sleep from "../utils/Sleep";

export const getActivities = async ({
  cache,
  pluginOptions,
  reporter,
  GCClient,
}: {
  cache: GatsbyCache;
  pluginOptions: PluginOptions & GarminPluginOptions;
  reporter: Reporter;
  GCClient: GarminConnect;
}): Promise<any[]> => {
  try {
    const activities = [];

    let cachedActivitiesIds = (await cache.get("GarminActivities")) || [];
    if (cachedActivitiesIds.length > 0) {
      cachedActivitiesIds.forEach(async (activityId: string) => {
        const cachedActivity = await cache.get(`GarminActivity${activityId}`);
        activities.push(cachedActivity);
      });

      if (pluginOptions.debug!) {
        reporter.success(
          `source-garmin: ${cachedActivitiesIds.length} activities restored from cache`
        );
      }
    }

    // set start date based on last fetch date
    let startDate = new Date(pluginOptions.startDate);
    const lastFetch = await cache.get("GarminActivitiesLastFetch");
    if (lastFetch !== undefined) {
      let lastFetchDate = new Date(lastFetch);
      // start date before last fetch date
      if (compareAsc(startDate, lastFetchDate) === -1) {
        startDate = lastFetchDate;
      }
    }

    const limit = 20;
    let start = 0;

    if (pluginOptions.debug) {
      reporter.info(
        "source-garmin: Fetching activities since " + startDate.toLocaleString()
      );
    }

    while (true) {
      let loadedActivities = await GCClient.getActivities(start, limit);

      let validActivities = loadedActivities.filter((a: any) => {
        compareAsc(startDate, new Date(a.beginTimestamp)) !== 1;
      });

      if (validActivities.length === 0) {
        // past the start date or no remaining activities
        break;
      }

      // add all the activities to the cache
      validActivities.forEach(
        async (a: any) => await cache.set(`GarminActivity${a.id}`, a)
      );

      if (pluginOptions.debug) {
        reporter.success(
          `source-garmin: ${validActivities.length} activities loaded from garmin`
        );
      }

      activities.push(...validActivities);

      start += limit;

      await Sleep(2000);
    }

    await cache.set(
      `GarminActivities`,
      activities.map((a) => a.id)
    );

    await cache.set("GarminActivitiesLastFetch", Date.now());
    return activities;
  } catch (e) {
    if (pluginOptions.debug) {
      reporter.panic(`source-garmin: `, e);
    } else {
      reporter.panic(`source-garmin: ${e.message}`);
    }
    return [];
  }
};
