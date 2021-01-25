import { GarminConnect } from "garmin-connect";
import { GatsbyNode, PluginOptions, SourceNodesArgs } from "gatsby";
import { getActivities } from "./garmin/getActivities";
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
              activity,
              id: createNodeId(`GarminActivity${activity.id}`),
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
  } catch (e) {
    if (pluginOptions.debug) {
      reporter.panic(`source-garmin: `, e);
    } else {
      reporter.panic(`source-garmin: ${e.message}`);
    }
  }
};
