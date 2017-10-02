import * as answerTypes from "constants/answer-types";
import { values } from "lodash";

describe("constants/answer-types", () => {
  it("should export strings", () => {
    expect(
      values(answerTypes).every(answerType => typeof answerType === "string")
    ).toBe(true);
  });
});
