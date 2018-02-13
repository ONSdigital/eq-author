import typeDefs from "eq-author-graphql-schema";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { SchemaLink } from "apollo-link-schema";
import resolvers from "tests/utils/MockResolvers";

const createExecutableSchema = () => {
  const schema = makeExecutableSchema({ typeDefs });
  addMockFunctionsToSchema({
    schema,
    mocks: resolvers,
    preserveResolvers: true
  });
  return schema;
};

export default () =>
  new SchemaLink({
    schema: createExecutableSchema()
  });
