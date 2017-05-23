#!/bin/bash
set -e

# Run the server
./node_modules/.bin/serve --port 3000 &
pid=$!

if ! ps -p $pid > /dev/null
then
   echo "Couldn't start server";
   exit;
fi


# Wait for server to start listening
sleep 3

# Run the tests
yarn smoketest

# Shutdown the server
kill -s SIGKILL $pid
