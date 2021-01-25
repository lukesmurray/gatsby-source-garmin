# Gatsby Source Garmin

This is a gatsby plugin for to use Garmin as a data source.
Under the hood the plugin relies on the [garmin-connect](https://github.com/Pythe1337N/garmin-connect) package to interface with the garmin api.

## Usage

1. Add `gatsby-source-garmin` to your gatsby project

```sh
yarn add gatsby-source-garmin
```

2. Add the following [.env variables](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/#defining-environment-variables)

```sh
GARMIN_EMAIL="the email address you use with garmin"
GARMIN_PASS="the password you use with garmin"
```

3. Add the plugin to your `gatsby-config.js` file.

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-garmin",
      options: {
        email: process.env.GARMIN_EMAIL,
        pass: process.env.GARMIN_PASS,
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
| endpoints |  false   | `[ "Activities", "Steps", "HeartRate", "Sleep", "SleepData" ]` | string[] | The garmin endpoints to hit. See [Garmin Connect](https://github.com/Pythe1337N/garmin-connect) for more information about each endpoint. Defaults to all endpoints exposed by this plugin. |
| debug     |  false   | false                                                          | boolean  | Whether to emit more verbose error messages and output.                                                                                                                                     |

## Contributing

All the code is in the `src` file.
To create the plugin run `yarn build`.
Then check the generated `js` files to make sure they look alright.
