/* eslint-disable import/unambiguous, no-console */
const process = require("child_process");
const fs = require("fs");
const chalk = require("chalk");

const OUTPUT_PATH = "public/status.json";
const rev = process
  .execSync("git rev-parse HEAD")
  .toString()
  .trim();

const status = {
  status: "OK",
  version: rev
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(status, null, "  "));

console.log(`
Status file written to: ${chalk.green(OUTPUT_PATH)}
`);
