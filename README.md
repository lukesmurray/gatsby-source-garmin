# Gatsby Source Garmin

This is a gatsby plugin for to use Garmin as a data source.
Under the hood the plugin relies on the [garmin-connect](https://github.com/Pythe1337N/garmin-connect) package to interface with the garmin api.

An example integration of the plugin can be found in the `example` directory.

## Usage

1. Add `gatsby-source-garmin` to your gatsby project

```sh
yarn add gatsby-source-garmin
```

2. Add the following [.env variables](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/#defining-environment-variables) to the files `.env.development` and `.env.production`.

```sh
GARMIN_EMAIL="the email address you use with garmin"
GARMIN_PASS="the password you use with garmin"
```

3. Add the plugin to your `gatsby-config.js` file.

```js
// add these lines at the top of gatsby-config.js to read the .env files
// you defined.
// gatsby uses dotenv internally so you do not have to install it.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// add the plugin to your list of plugins and set the required options
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-garmin",
      options: {
        email: process.env.GARMIN_EMAIL,
        password: process.env.GARMIN_PASS,
        startDate: new Date(2020, 0, 1).getTime(), // month is 0 indexed so 0 is january
      },
    },
  ],
};
```

## Options

| Key       | Required | Default                                                        | Type     | Description                                                                                                                                                                                 |
| :-------- | :------: | :------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| email     |   true   |                                                                | string   | The email address you use to login to Garmin                                                                                                                                                |
| password  |   true   |                                                                | string   | The password you use to login to Garmin.                                                                                                                                                    |
| startDate |   true   |                                                                | number   | The start date for retrieving garmin data. Data from before this date is not sourced.                                                                                                       |
| endpoints |  false   | `[ "Activities", "Steps", "HeartRate", "SleepData" ]` | string[] | The garmin endpoints to hit. See [Garmin Connect](https://github.com/Pythe1337N/garmin-connect) for more information about each endpoint. Defaults to all endpoints exposed by this plugin. |
| debug     |  false   | false                                                          | boolean  | Whether to emit more verbose error messages and output.                                                                                                                                     |

## Graphql

The source plugin contributes the following types `GarminActivity`, `GarminSteps`, `GarminHeartRates`, and `GarminSleepData`.
Each type has a data field containing the data from the garmin API or a date and the data from the garmin API.

```graphql
query ExampleQuery {
  garminSteps {
    data
  }
  garminSleepData {
    data
  }
  garminHeartRates {
    data
  }
  garminActivity {
    data
  }
}
```

## Contributing

The source code is in the `src` folder.
An example of the plugin is in the `example` folder and can be run with `gatsby develop` from within the example folder.
After changing the source code transpile the js with `yarn build`.

## Releasing

1. Run `npm release` and hit `ctrl+c` to get out of the husky hook
2. Run `npm publish`
