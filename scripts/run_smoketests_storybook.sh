#!/bin/bash

set -evuf -o pipefail

# Build the storybook
yarn storybook-build

# Serve the storybook
./node_modules/.bin/serve -S -p 9001 storybook-static/ &
pid=$!

function finish {
  echo "Shutting down the server..."
  kill -s SIGKILL $pid
}
trap finish INT KILL TERM EXIT

# Wait for server to start listening
./node_modules/.bin/wait-on http://localhost:9001 -t 10000

# Run the tests
yarn smoketest:storybook