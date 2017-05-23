#!/bin/bash

# Run the server
./node_modules/.bin/serve --port 3000 &
pid=$!

# Wait for server to start listening
sleep 3

# Run the tests
yarn smoketest

# Shutdown the server
kill -s SIGKILL $pid
