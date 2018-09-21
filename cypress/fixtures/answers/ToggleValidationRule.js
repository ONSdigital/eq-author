export const toggleEarliestDate = {
  data: {
    toggleValidationRule: {
      id: "1",
      enabled: true,
      customDate: null,
      offset: { value: 0, unit: "Days", __typename: "Duration" },
      relativePosition: "Before",
      __typename: "EarliestDateValidationRule"
    }
  }
};

export const toggleLatestDate = {
  data: {
    toggleValidationRule: {
      id: "2",
      enabled: true,
      customDate: null,
      offset: { value: 0, unit: "Days", __typename: "Duration" },
      relativePosition: "After",
      __typename: "LatestDateValidationRule"
    }
  }
};
