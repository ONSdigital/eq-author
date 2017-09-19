#/bin/bash

pushd ../eq-author-graphql-schema
rm -Rf node_modules
yarn
popd

pushd ../eq-author-api
docker ps -aq | xargs docker rm -vf
rm -Rf node_modules
yarn
docker-compose build
popd

rm -Rf node_modules
yarn
