import addDays from "date-fns/addDays";
import compareAsc from "date-fns/compareAsc";
import format from "date-fns/format";
import { GarminConnect } from "garmin-connect";
import { GatsbyCache, PluginOptions, Reporter } from "gatsby";
import GarminPluginOptions from "../utils/GarminPluginOptions";

export const getSteps = async ({
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
    const steps = [];

    let cachedStepIds = (await cache.get("GarminSteps")) || [];
    if (cachedStepIds.length > 0) {
      cachedStepIds.forEach(async (stepId: string) => {
        const cachedSteps = await cache.get(stepId);
        cachedSteps.date = new Date(cachedSteps.date);
        steps.push(cachedSteps);
      });

      if (pluginOptions.debug!) {
        reporter.info(
          `source-garmin: ${cachedStepIds.length} steps restored from cache`
        );
      }
    }

    // set start date based on last fetch date
    let startDate = new Date(pluginOptions.startDate);
    const lastFetch = await cache.get("GarminStepsLastFetch");
    if (lastFetch !== undefined) {
      let lastFetchDate = new Date(lastFetch);
      // start date before last fetch date
      if (compareAsc(startDate, lastFetchDate) === -1) {
        startDate = lastFetchDate;
      }
    }

    if (pluginOptions.debug) {
      reporter.info(
        "source-garmin: Fetching steps since " + startDate.toLocaleString()
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
      let loadedSteps = await GCClient.getSteps(current);

      if (pluginOptions.debug) {
        reporter.info(
          "source-garmin: Loaded steps for " + formatStepsDate(current)
        );
      }

      let storedSteps = {
        date: current,
        steps: loadedSteps,
      };

      await cache.set(formatStepId(current), {
        ...storedSteps,
        date: storedSteps.date.getTime(),
      });

      steps.push(storedSteps);

      current = addDays(current, -1);
    }

    await cache.set(
      `GarminSteps`,
      steps.map((step) => formatStepId(step.date))
    );

    await cache.set("GarminStepsLastFetch", Date.now());
    return steps;
  } catch (e) {
    if (pluginOptions.debug) {
      reporter.panic(`source-garmin: `, e);
    } else {
      reporter.panic(`source-garmin: ${e.message}`);
    }
    return [];
  }
};

function formatStepId(date: Date): string {
  return `GarminSteps${formatStepsDate(date)}`;
}

function formatStepsDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}
