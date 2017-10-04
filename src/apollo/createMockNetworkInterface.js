import schema from "eq-author-graphql-schema";
import { makeExecutableSchema } from "graphql-tools";
const { MockNetworkInterface } = require("eq-author-mock-api");
const { GraphQLDate } = require("graphql-iso-date");

export default (mocks = {}) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: {
      Date: GraphQLDate
    }
  });

  return new MockNetworkInterface(executableSchema, mocks);
};
