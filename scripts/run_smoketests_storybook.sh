#!/bin/bash

set -euf -o pipefail

# Run the server
yarn storybook &
pid=$!

function display_result {
  RESULT=$1
  EXIT_STATUS=$2
  TEST=$3

  if [ $RESULT -ne 0 ]; then
    echo -e "\033[31m$TEST failed\033[0m"
    exit $EXIT_STATUS
  else
    echo -e "\033[32m$TEST passed\033[0m"
  fi
}

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
yarn smoketest:storybook 2>&1

display_result $? 5 "Storybook Smoke tests"
