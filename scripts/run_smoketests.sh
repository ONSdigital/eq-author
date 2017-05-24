#!/bin/bash
set -e

# Run the server
./node_modules/.bin/serve --port 3000 &
pid=$!

# Check server has started
if ! ps -p $pid > /dev/null
then
   echo "Couldn't start server";
   exit;
fi

# Shutdown server whenever script exists
function finish {
  echo "Killing server"
  kill -s SIGKILL $pid
}
trap finish EXIT

# Wait for server to start listening
sleep 3

# Run the tests
yarn smoketest
