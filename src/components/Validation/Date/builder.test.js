import { readToWriteMapper } from "./builder";

describe("Date validation builder", () => {
  describe("readToWriteMapper", () => {
    it("should map from the read to write structure of a date validation", () => {
      const mapper = readToWriteMapper("earliestDateInput");
      expect(
        mapper({
          id: 1,
          customDate: "12/05/1987",
          offset: {
            unit: "Months",
            value: 1
          },
          relativePosition: "Before",
          enabled: true
        })
      ).toEqual({
        id: 1,
        earliestDateInput: {
          custom: "12/05/1987",
          offset: {
            unit: "Months",
            value: 1
          },
          relativePosition: "Before"
        }
      });
    });

    it("should send null when the custom date is empty", () => {
      const mapper = readToWriteMapper("latestDateInput");
      expect(
        mapper({
          id: 1,
          customDate: "",
          offset: {
            unit: "Months",
            value: 1
          },
          relativePosition: "Before",
          enabled: true
        })
      ).toEqual({
        id: 1,
        latestDateInput: {
          custom: null,
          offset: {
            unit: "Months",
            value: 1
          },
          relativePosition: "Before"
        }
      });
    });
  });
});
