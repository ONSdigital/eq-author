[![Build Status](https://travis-ci.org/ONSdigital/eq-author.svg?branch=master)](https://travis-ci.org/ONSdigital/eq-author)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## Installation

### Prerequisites

- Node.js 7.10.0
- [Yarn](https://yarnpkg.com/en/)
- Google Chrome

### How to install

- Just run `yarn` to install all dependencies.

## Folder Structure

`/.storybook` Config for storybook.

`/config` Webpack config.

`/data` Example Runner JSON schemas.

`/public` Public static assets.

`/scripts` NPM scripts for running the app.

`/src` JavaScript source files.

`/src/actions` Redux action creators.

`/src/components` React components.

`/src/constants` Constants that can be used throughout the application such as theme colours and action names.

`/src/containers` Redux container components.

`/src/helpers` Helper functions, etc.

`/src/layouts` Layout components.

`/src/pages` Page components rendered via a route.

`/src/reducers` Redux reducer functions.

`/src/schema` Schema for Normalizr.

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn lint`

Lints the `src` directory using the rules defined in `.eslintrc`. Run `yarn lint -- --fix` if you want eslint to fix any issues it can.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

If you would like to collect code coverage run `yarn test -- --coverage`.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `yarn deploy`

Builds (via `yarn build`) and deploys the project to Github Pages.

### `yarn storybook`

Spins up the Storybook development server.

## Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By
default you will have `NODE_ENV` defined for you, and any other environment variables starting with
`REACT_APP_`.

>Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except `NODE_ENV` will be ignored to avoid accidentally [exposing a private key on the machine that could have the same name](https://github.com/facebookincubator/create-react-app/issues/865#issuecomment-252199527).

These environment variables will be defined for you on `process.env`. For example, having an environment
variable named `REACT_APP_SECRET_CODE` will be exposed in your JS as `process.env.REACT_APP_SECRET_CODE`, in addition
to `process.env.NODE_ENV`.

### Adding Development Environment Variables In `.env`

To define permanent environment variables, add them to the `.env` file in the root of the project:

```
REACT_APP_SECRET_CODE=abcdef
```

These variables will act as the defaults if the machine does not explicitly set them.<br>
Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

## Authentication

We currently use firebase for basic authentication requirements. The following environment variables are required for firebase:

* `REACT_APP_FIREBASE_PROJECT_ID`
* `REACT_APP_FIREBASE_API_KEY`
* `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`

These can either be passed on command line:

```bash
REACT_APP_FIREBASE_PROJECT_ID=ABC REACT_APP_FIREBASE_API_KEY=DEF REACT_APP_FIREBASE_MESSAGING_SENDER_ID=GHI yarn start
```

Or they can be added to an `.env.development.local` file in the root of the repo:

```
REACT_APP_FIREBASE_PROJECT_ID="ABC"
REACT_APP_FIREBASE_API_KEY="DEF"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="GHI"
```

Note: CLI env vars taken precedence over `.env.development.local` vars. For more information about precedence of config files, see: https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use

### Enabling / disabling authentication

Firebase authentication can be disabled by setting the env var `REACT_APP_ENABLE_AUTH=false`. Disabling firebase authentication allows users to login as a guest.

## Testing

### End-to-end (e2e) tests

Author's e2e testing is run using the Cypress framework and can be run using the following commands provided author is already running with AUTH disabled using the `REACT_APP_ENABLE_AUTH=false` env variable:

* `yarn test:e2e` 

Launches Cypress on Chrome and automatically runs the default test suite. 

* `yarn cypress:open`

Launches Cypress using the Electron framework and allows for choosing which test to run and a more interactive and detailed testing enviroment.

By default the e2e tests will be run against `http://localhost:3000` as configured in the [.env configuration](.env.test). It is possible to point Cypress at another environment by overriding the `CYPRESS_baseUrl` environment variable.

e.g. `CYPRESS_baseUrl=http://some-other-environment yarn cypress:open`

### Filename Conventions

Tests are colocated next to the code they are testing. For example, a test for `/src/components/Button/index.js` could be in a file `/src/components/Button/test.js`.

### Command Line Interface

When you run `yarn test`, Jest will launch in the watch mode. Every time you save a file, it will re-run the tests, just like `yarn start` recompiles the code.

The watcher includes an interactive command-line interface with the ability to run all tests, or focus on a search pattern. It is designed this way so that you can keep it open and enjoy fast re-runs.

# Troubleshooting

## Jest crashing

### Problem

Running `yarn test` causes Jest to crash with the following error:
```
(FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
(FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
(FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
events.js:160
      throw er; // Unhandled 'error' event
      ^

Error: Error watching file for changes: EMFILE
    at exports._errnoException (util.js:1036:11)
    at FSEvent.FSWatcher._handle.onchange (fs.js:1406:11)
```

### Solution

According to [this thread](https://github.com/facebook/jest/issues/1767), install watchman: `brew install watchman`

