import createClient from "./createClient";
import { ApolloClient } from "apollo-client";

describe("createClient", () => {
  let networkInterface;

  beforeAll(() => {
    networkInterface = jest.mock();
  });

  it("should return an instance of ApolloClient", () => {
    const result = createClient(networkInterface);
    expect(result).toBeInstanceOf(ApolloClient);
  });

  it("should set the network interface on the client", () => {
    expect(createClient(networkInterface).networkInterface).toEqual(
      networkInterface
    );
  });

  it("should provide a function which allows dataId from result", () => {
    const result = {
      id: 1,
      __typename: "Questionnaire"
    };
    const client = createClient(networkInterface);
    expect(client.dataIdFromObject(result)).toEqual("Questionnaire1");
  });

  it("should provide a function which returns null for invalid result", () => {
    const client = createClient(networkInterface);
    expect(client.dataIdFromObject(jest.mock())).toBeNull();
  });

  it("should set add typename to true", () => {
    const client = createClient(networkInterface);
    expect(client.addTypename).toEqual(true);
  });
});
