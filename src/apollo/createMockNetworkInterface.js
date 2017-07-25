import schema from "eq-author-graphql-schema";
const { MockNetworkInterface } = require("eq-author-mock-api");

export default (mocks = {}) => new MockNetworkInterface(schema, mocks);
