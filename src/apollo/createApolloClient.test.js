import createApolloClient from "./createApolloClient";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";

describe("createClient", () => {
  let link, cache, client;

  beforeAll(() => {
    link = jest.fn();
    cache = jest.fn();

    client = createApolloClient(link, cache);
  });

  it("should return an instance of ApolloClient", () => {
    expect(client).toBeInstanceOf(ApolloClient);
  });

  it("should set the link", () => {
    expect(client.link).toBeInstanceOf(ApolloLink);
  });

  it("should set the cache", () => {
    expect(client.cache).toBe(cache);
  });
});
