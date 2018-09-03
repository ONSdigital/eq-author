#!/usr/bin/env node
/* eslint-disable import/unambiguous, no-console */

const fs = require("fs");
const path = require("path");
const { request } = require("graphql-request");
const chalk = require("chalk");
const { introspectionQuery } = require("graphql/utilities");
const gql = require("graphql-tag");

// Set up environment
process.env.NODE_ENV = "development";
require("../config/env");
const { REACT_APP_API_URL } = process.env;
const OUTPUT_PATH = path.resolve(__dirname, "..");

const actionType = process.argv[2];

const actions = {
  schema: {
    query: introspectionQuery,
    file: "schema.json"
  },
  fragmentTypes: {
    query: `
{
  __schema {
    types {
      kind
      name
      possibleTypes {
        name
      }
    }
  }
}`,
    file: "src/apollo/fragmentTypes.json"
  }
};

const config = actions[actionType];
if (!config) {
  console.error(chalk.red(`Unknown action type: ${actionType}`));
  process.exit(1);
}
const { query, file } = config;

if (!REACT_APP_API_URL) {
  console.error(chalk.red("Error: REACT_APP_API_URL must be set"));
  process.exit(1);
}
console.log("Fetching schema from Author API server");
console.log(`Using Author API Server: ${REACT_APP_API_URL}`);

const filePath = path.join(OUTPUT_PATH, file);
request(REACT_APP_API_URL, gql(query))
  .then(schema => {
    fs.writeFileSync(filePath, JSON.stringify(schema, null, 2));
  })
  .then(() => {
    console.log(`Wrote file to: ${filePath}`);
  })
  .catch(err => {
    console.error(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  });
