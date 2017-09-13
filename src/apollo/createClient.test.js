import createClient from "./createClient";
import { ApolloClient } from "apollo-client";
import getIdForObject from "utils/getIdForObject";

describe("createClient", () => {
  let networkInterface, client;

  beforeAll(() => {
    networkInterface = jest.mock();
    client = createClient(networkInterface);
  });

  it("should return an instance of ApolloClient", () => {
    expect(client).toBeInstanceOf(ApolloClient);
  });

  it("should set the network interface on the client", () => {
    expect(client.networkInterface).toBe(networkInterface);
  });

  it("should use getIdForObject to for keying entities", () => {
    expect(client.dataIdFromObject).toBe(getIdForObject);
  });

  it("should set add typename to true", () => {
    expect(client.addTypename).toBe(true);
  });
});
