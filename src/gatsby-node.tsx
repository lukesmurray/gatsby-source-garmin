import { GarminConnect } from "garmin-connect";
import { GatsbyNode, PluginOptions, SourceNodesArgs } from "gatsby";
import { getActivities } from "./garmin/getActivities";
import { getSteps } from "./garmin/getSteps";
import Endpoints from "./utils/Endpoints";
import GarminPluginOptions, {
  defaultGarminPluginOptions,
} from "./utils/GarminPluginOptions";

export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({
  Joi,
}) => {
  return Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    startDate: Joi.number().required(),
    endpoints: Joi.array().items(Joi.string().valid(...Endpoints.values)),
    debug: Joi.boolean(),
  });
};

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  {
    actions,
    createNodeId,
    createContentDigest,
    reporter,
    cache,
  }: SourceNodesArgs,
  pluginOptions: PluginOptions & GarminPluginOptions
) => {
  const GCClient = new GarminConnect();

  pluginOptions = { ...defaultGarminPluginOptions, ...pluginOptions };

  try {
    await GCClient.login(pluginOptions.email, pluginOptions.password);

    if (pluginOptions.endpoints!.indexOf("Activities") !== -1) {
      const activities = await getActivities({
        cache,
        pluginOptions,
        reporter,
        GCClient,
      });

      if (activities && activities.length > 0) {
        activities.forEach((activity) => {
          actions.createNode(
            {
              data: activity,
              id: createNodeId(`GarminActivity${activity.activityId}`),
              internal: {
                type: "GarminActivity",
                contentDigest: createContentDigest(activity),
              },
            },
            {
              name: "gatsby-source-garmin",
            }
          );
        });

        reporter.success(
          `source-garmin: ${activities.length} activities fetched`
        );
      }
    }

    if (pluginOptions.endpoints!.indexOf("Steps") !== -1) {
      const steps = await getSteps({
        cache,
        pluginOptions,
        reporter,
        GCClient,
      });

      if (steps && steps.length > 0) {
        steps.forEach((step) => {
          actions.createNode(
            {
              data: step,
              id: createNodeId(`GarminSteps${step.date}`),
              internal: {
                type: "GarminSteps",
                contentDigest: createContentDigest(step),
              },
            },
            {
              name: "gatsby-source-garmin",
            }
          );
        });

        reporter.success(
          `source-garmin: ${steps.length} days of steps fetched`
        );
      }
    }
  } catch (e) {
    if (pluginOptions.debug) {
      reporter.panic(`source-garmin: `, e);
    } else {
      reporter.panic(`source-garmin: ${e.message}`);
    }
  }
};
