import getDestinationId from "./getDestinationId";

describe("getDestinationId", () => {
  it("should return the name of the logical destination", () => {
    expect(
      getDestinationId({
        logicalDestination: "NextPage"
      })
    ).toEqual("NextPage");
  });

  it("should return `id` and `__typename` for absolute destinations", () => {
    const absoluteDestination = {
      absoluteDestination: {
        __typename: "Section",
        id: "1"
      }
    };

    expect(getDestinationId(absoluteDestination)).toEqual("Section1");
  });

  it("should throw error for invalid input", () => {
    expect(() => getDestinationId({})).toThrowError();
  });
});
