import fs from "fs/promises";
import { GarminConnect } from "garmin-connect";
import { GatsbyNode } from "gatsby";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = () => {
  return Promise.resolve();
};

export const createPages: GatsbyNode["createPages"] = async () => {
  async function writeJson<T extends Object>(name: string, data: T) {
    await fs.writeFile(`responses/${name}.json`, JSON.stringify(data, null, 2));
  }

  const GCClient = new GarminConnect();

  await GCClient.login();

  const userInfo = await GCClient.getUserInfo();
  await writeJson("userInfo", userInfo);

  const socialProfile = await GCClient.getSocialProfile();
  await writeJson("socialProfile", socialProfile);

  const socialConnections = await GCClient.getSocialConnections();
  await writeJson("socialConnections", socialConnections);

  const deviceInfo = await GCClient.getDeviceInfo();
  await writeJson("deviceInfo", deviceInfo);

  const activities = await GCClient.getActivities(0, 10);
  await writeJson("activities", activities);

  const activity = await GCClient.getActivity(activities[0]);
  await writeJson("activity", activity);

  const newsFeed = await GCClient.getNewsFeed(0, 10);
  await writeJson("newsFeed", newsFeed);

  const steps = await GCClient.getSteps();
  await writeJson("steps", steps);

  const hr = await GCClient.getHeartRate();
  await writeJson("heartRate", hr);

  const sleep = await GCClient.getSleep();
  await writeJson("sleep", sleep);

  const sleepData = await GCClient.getSleepData();
  await writeJson("sleepData", sleepData);
};
