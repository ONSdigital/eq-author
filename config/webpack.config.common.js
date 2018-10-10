/* eslint-disable import/unambiguous */
"use strict";

const path = require("path");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const paths = require("./paths");

module.exports.resolve = {
  // This allows you to set a fallback for where Webpack should look for modules.
  // We placed these paths second because we want `node_modules` to "win"
  // if there are any conflicts. This matches Node resolution mechanism.
  // https://github.com/facebookincubator/create-react-app/issues/253
  modules: [paths.appSrc, "node_modules", paths.appNodeModules].concat(
    // It is guaranteed to exist because we tweak it in `env.js`
    process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
  ),
  // These are the reasonable defaults supported by the Node ecosystem.
  // We also include JSX as a common component filename extension to support
  // some tools, although we do not recommend using it, see:
  // https://github.com/facebookincubator/create-react-app/issues/290
  extensions: [".js", ".json", ".jsx"],
  alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    "react-native": "react-native-web"
  },
  plugins: [
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin(paths.appSrc)
  ]
};

module.exports.loaders = {
  eslint: {
    // TODO: Disable require.ensure as it's not a standard language feature.
    // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
    // { parser: { requireEnsure: false } },

    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    test: /\.(js|jsx)$/,
    enforce: "pre",
    use: [
      {
        options: {
          formatter: eslintFormatter
        },
        loader: require.resolve("eslint-loader")
      }
    ],
    include: paths.appSrc
  },

  fileExclusions: {
    // ** ADDING/UPDATING LOADERS **
    // The "file" loader handles all assets unless explicitly excluded.
    // The `exclude` list *must* be updated with every change to loader extensions.
    // When adding a new loader, you must add its `test`
    // as a new entry in the `exclude` list for "file" loader.

    // "file" loader makes sure those assets get served by WebpackDevServer.
    // When you `import` an asset, you get its (virtual) filename.
    // In production, they would get copied to the `build` folder.

    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
      /\.css$/,
      /\.svg$/,
      /\.json$/,
      /\.bmp$/,
      /\.gif$/,
      /\.jpe?g$/,
      /\.png$/,
      /\.(graphql|gql)$/,
      /\.ejs$/
    ],
    loader: require.resolve("file-loader"),
    options: {
      name: "static/media/[name].[hash:8].[ext]"
    }
  },

  url: {
    // "url" loader works like "file" loader except that it embeds assets
    // smaller than specified limit in bytes as data URLs to avoid requests.
    // A missing `test` is equivalent to a match.
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve("url-loader"),
    options: {
      limit: 10000,
      name: "static/media/[name].[hash:8].[ext]"
    }
  },

  gql: {
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: "graphql-tag/loader"
  },

  svg: {
    test: /\.svg$/,
    oneOf: [
      {
        resourceQuery: /inline/, // foo.svg?inline
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader"
          }
        ]
      },
      {
        use: [
          {
            loader: "file-loader"
          },
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false }
              ]
            }
          }
        ]
      }
    ]
  }
  // ** STOP ** Are you adding a new loader?
  // Remember to add the new extension(s) to the "file" loader exclusion list.
};
