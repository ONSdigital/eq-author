[![Build Status](https://travis-ci.org/ONSdigital/eq-author.svg?branch=master)](https://travis-ci.org/ONSdigital/eq-author)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)

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

## Testing

### Filename Conventions

Tests are colocated next to the code they are testing. For example, a test for `/src/components/Button/index.js` could be in a file `/src/components/Button/test.js`.

### Command Line Interface

When you run `yarn test`, Jest will launch in the watch mode. Every time you save a file, it will re-run the tests, just like `yarn start` recompiles the code.

The watcher includes an interactive command-line interface with the ability to run all tests, or focus on a search pattern. It is designed this way so that you can keep it open and enjoy fast re-runs.
