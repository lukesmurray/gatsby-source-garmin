import addDays from "date-fns/addDays";
import compareAsc from "date-fns/compareAsc";
import format from "date-fns/format";
import { GarminConnect } from "garmin-connect";
import { GatsbyCache, PluginOptions, Reporter } from "gatsby";
import GarminPluginOptions from "../utils/GarminPluginOptions";

export const getSleepData = async ({
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
    const sleepData = [];

    let cacheSleepDataIds = (await cache.get("GarminSleepData")) || [];
    if (cacheSleepDataIds.length > 0) {
      cacheSleepDataIds.forEach(async (sleepId: string) => {
        const cachedSleepData = await cache.get(sleepId);
        cachedSleepData.date = new Date(cachedSleepData.date);
        sleepData.push(cachedSleepData);
      });

      if (pluginOptions.debug!) {
        reporter.info(
          `source-garmin: ${cacheSleepDataIds.length} sleep data restored from cache`
        );
      }
    }

    // set start date based on last fetch date
    let startDate = new Date(pluginOptions.startDate);
    const lastFetch = await cache.get("GarminSleepDataLastFetch");
    if (lastFetch !== undefined) {
      let lastFetchDate = new Date(lastFetch);
      // start date before last fetch date
      if (compareAsc(startDate, lastFetchDate) === -1) {
        startDate = lastFetchDate;
      }
    }

    if (pluginOptions.debug) {
      reporter.info(
        "source-garmin: Fetching sleep data since " + startDate.toLocaleString()
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
      let loadedSleep = await GCClient.getSleepData(current);

      if (pluginOptions.debug) {
        reporter.info(
          "source-garmin: Loaded sleep data for " + formatSleepDate(current)
        );
      }

      let storedSleep = {
        date: current,
        data: loadedSleep,
      };

      await cache.set(formatSleepId(current), {
        ...storedSleep,
        date: storedSleep.date.getTime(),
      });

      sleepData.push(storedSleep);

      current = addDays(current, -1);
    }

    await cache.set(
      `GarminSleepData`,
      sleepData.map((step) => formatSleepId(step.date))
    );

    await cache.set("GarminSleepDataLastFetch", Date.now());
    return sleepData;
  } catch (e) {
    if (pluginOptions.debug) {
      reporter.panic(`source-garmin: `, e);
    } else {
      reporter.panic(`source-garmin: ${e.message}`);
    }
    return [];
  }
};

export function formatSleepId(date: Date): string {
  return `GarminSleepData${formatSleepDate(date)}`;
}

function formatSleepDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}
