import addDays from "date-fns/addDays";
import compareAsc from "date-fns/compareAsc";
import format from "date-fns/format";
import { GarminConnect } from "garmin-connect";
import { GatsbyCache, PluginOptions, Reporter } from "gatsby";
import GarminPluginOptions from "../utils/GarminPluginOptions";

export const getHeartRate = async ({
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
    const heartRate = [];

    let cacheHrIds = (await cache.get("GarminHrs")) || [];
    if (cacheHrIds.length > 0) {
      cacheHrIds.forEach(async (hrId: string) => {
        const cachedHr = await cache.get(hrId);
        cachedHr.date = new Date(cachedHr.date);
        heartRate.push(cachedHr);
      });

      if (pluginOptions.debug!) {
        reporter.info(
          `source-garmin: ${cacheHrIds.length} heart rates restored from cache`
        );
      }
    }

    // set start date based on last fetch date
    let startDate = new Date(pluginOptions.startDate);
    const lastFetch = await cache.get("GarminHrsLastFetch");
    if (lastFetch !== undefined) {
      let lastFetchDate = new Date(lastFetch);
      // start date before last fetch date
      if (compareAsc(startDate, lastFetchDate) === -1) {
        startDate = lastFetchDate;
      }
    }

    if (pluginOptions.debug) {
      reporter.info(
        "source-garmin: Fetching heart rates since " +
          startDate.toLocaleString()
      );
    }

    // never retrieve steps for the current day
    // if we do then the cache gets complicated
    const end = addDays(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      -1
    );

    let current = new Date(end.getTime());

    // while current is greater than or equal to start date
    while (compareAsc(startDate, current) !== 1) {
      let loadedHeartRate = await GCClient.getHeartRate(current);

      if (pluginOptions.debug) {
        reporter.info(
          "source-garmin: Loaded heart rates for " + formatHrDate(current)
        );
      }

      let storedSteps = {
        date: current,
        data: loadedHeartRate,
      };

      await cache.set(formatHrId(current), {
        ...storedSteps,
        date: storedSteps.date.getTime(),
      });

      heartRate.push(storedSteps);

      current = addDays(current, -1);
    }

    await cache.set(
      `GarminHrs`,
      heartRate.map((step) => formatHrId(step.date))
    );

    await cache.set("GarminHrsLastFetch", Date.now());
    return heartRate;
  } catch (e) {
    if (pluginOptions.debug) {
      reporter.panic(`source-garmin: `, e);
    } else {
      reporter.panic(`source-garmin: ${e.message}`);
    }
    return [];
  }
};

export function formatHrId(date: Date): string {
  return `GarminHeartRates${formatHrDate(date)}`;
}

function formatHrDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}
