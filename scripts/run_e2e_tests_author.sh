#!/bin/bash

set -evuf -o pipefail

# Read test env vars
export $(egrep -v '^#' .env.test | xargs)

# Build a version of the app which runs with the mockAPI
REACT_APP_ENABLE_AUTH=false yarn build:mockAPI

# Serve the app
yarn serve &
pid=$!

function finish {
  echo "Shutting down the server..."
  kill -s SIGKILL $pid
}
trap finish INT KILL TERM EXIT

# Wait for server to start listening
./node_modules/.bin/wait-on $CYPRESS_baseUrl -t 10000

# Run the tests
node_modules/.bin/cypress run -s cypress/integration/author_spec.js --browser chrome
