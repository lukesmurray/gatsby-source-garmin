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
        garminEmail: process.env.GARMIN_EMAIL,
        garminPass: process.env.GARMIN_PASS,
      },
    },
  ],
};
```

## Options

| Key         | Required | Default | Description                                  |
| :---------- | :------: | :------ | :------------------------------------------- |
| garminEmail |   true   |         | The email address you use to login to Garmin |
| garminPass  |   true   |         | The password you use to login to Garmin.     |

## Contributing

All the code is in the `src` file.
To create the plugin run `yarn build`.
Then check the generated `js` files to make sure they look alright.
