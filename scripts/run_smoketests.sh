#!/bin/bash

# Run the server
serve --port 3000 &
pid=$!

# Wait for server to start listening
sleep 3

# Run the tests
curl localhost:3000

# Shutdown the server
kill -s SIGKILL $pid
