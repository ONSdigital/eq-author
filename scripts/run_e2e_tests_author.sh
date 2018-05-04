#!/bin/bash

set -evuf -o pipefail

# Read test env vars
export $(egrep -v '^#' .env.test | xargs)

# Build a version of the app which runs with the mockAPI
yarn build

# Serve the app
yarn serve &
pid=$!

function finish {
  echo "Shutting down the server..."
  kill -s SIGKILL $pid
  docker-compose -f ./scripts/e2e.yml down
}
trap finish INT KILL TERM EXIT

# Wait for server to start listening
./node_modules/.bin/wait-on $CYPRESS_baseUrl -t 10000

# start API/DB, and wait until running
docker-compose -f ./scripts/e2e.yml up -d
./node_modules/.bin/wait-on tcp:4000

# Run the tests
./node_modules/.bin/cypress run -s cypress/integration/author_spec.js --browser chrome --record
