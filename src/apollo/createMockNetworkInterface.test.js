import { MockNetworkInterface } from "eq-author-mock-api";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";
import createMockNetworkInterface from "./createMockNetworkInterface";

describe("createMockNetworkInterface", () => {
  let query;

  beforeEach(() => {
    query = gql`
      {
        questionnaires {
          title
        }
      }
    `;
  });

  it("should create a mock network interface", () => {
    const result = createMockNetworkInterface();
    expect(result).toBeInstanceOf(MockNetworkInterface);
  });

  it("should set default mock resolvers if none specified", () => {
    const client = new ApolloClient({
      networkInterface: createMockNetworkInterface({})
    });

    return client.query({ query }).then(result => {
      expect(result.data.questionnaires[0].title).toEqual("Hello World");
    });
  });

  it("should be possible to customize the mock resolvers", () => {
    const client = new ApolloClient({
      networkInterface: createMockNetworkInterface({
        String: () => "Custom"
      })
    });

    return client.query({ query }).then(result => {
      expect(result.data.questionnaires[0].title).toEqual("Custom");
    });
  });
});
