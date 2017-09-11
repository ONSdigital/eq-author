import getIdFromObject from "./getIdFromObject";

describe("getIdFromObject", () => {
  it("should return a valid id if `id` and `__typename` fields are present", () => {
    const result = {
      __typename: "Questionnaire",
      id: 1
    };

    expect(getIdFromObject(result)).toEqual("Questionnaire1");
  });

  it("should returns null for invalid result", () => {
    expect(getIdFromObject({})).toBeNull();
  });
});
