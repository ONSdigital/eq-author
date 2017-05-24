#!/bin/bash

set -euf -o pipefail

# Run the server
serve --port 3000 build/ &
pid=$!

# Shutdown server whenever script exists
function finish {
  echo "Killing server"
  kill -s SIGKILL $pid
}
trap finish EXIT

# Wait for server to start listening
sleep 3

echo "About to run tests..."

# Run the tests
yarn smoketest

echo "Done"
