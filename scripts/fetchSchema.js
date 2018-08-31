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
const SCHEMA_PATH = path.resolve(__dirname, "..", "schema.json");

if (!REACT_APP_API_URL) {
  console.error(chalk.red("Error: REACT_APP_API_URL must be set"));
  process.exit(1);
}
console.log("Fetching schema from Author API server");
console.log(`Using Author API Server: ${REACT_APP_API_URL}`);

request(REACT_APP_API_URL, gql(introspectionQuery))
  .then(schema => {
    fs.writeFileSync(SCHEMA_PATH, JSON.stringify(schema, null, 2));
  })
  .then(() => {
    console.log(`Wrote file to: ${SCHEMA_PATH}`);
  })
  .catch(err => {
    console.error(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  });
