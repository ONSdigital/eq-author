#!/bin/bash

set -euf -o pipefail

function read_vars {
  if [ -f $1 ]; then
    echo "reading env vars: $1"
    export $(egrep -v '^#' $1 | xargs) > /dev/null
  fi
}

function dotenv {
  environment=${NODE_ENV:-test}

  read_vars ".env.$environment"
  read_vars ".env.$environment.local"
}

# Read env vars
dotenv

# Build the app
yarn build

# Serve the app
yarn serve &
pid=$!

function finish {
  echo "Shutting down the server..."

  echo "killing $pid"
  pgrep -P $pid | xargs kill # kills all child processes

  echo "stopping docker containers"
  docker-compose -f ./scripts/e2e.yml down
}
trap finish INT KILL TERM EXIT

# Wait for server to start listening
./node_modules/.bin/wait-on $CYPRESS_baseUrl -t 20000

# start API/DB, and wait until running
docker-compose -f ./scripts/e2e.yml pull
docker-compose -f ./scripts/e2e.yml up -d
./node_modules/.bin/wait-on tcp:4000

# Run the tests
if [ -z "${CYPRESS_RECORD_KEY-}" ]; then
  yarn cypress run --browser chrome
else
  yarn cypress run --browser electron --record
fi
