export const updateValidationRuleOffsetValue = {
  data: {
    updateValidationRule: {
      id: "1",
      enabled: true,
      customDate: null,
      offset: { value: 5, unit: "Days", __typename: "Duration" },
      relativePosition: "Before",
      __typename: "EarliestDateValidationRule"
    }
  }
};

export const updateValidationRuleOffsetUnit = {
  data: {
    updateValidationRule: {
      id: "1",
      enabled: true,
      customDate: null,
      offset: { value: 5, unit: "Months", __typename: "Duration" },
      relativePosition: "Before",
      __typename: "EarliestDateValidationRule"
    }
  }
};

export const updateValidationRuleRelativePosition = {
  data: {
    updateValidationRule: {
      id: "1",
      enabled: true,
      customDate: null,
      offset: { value: 5, unit: "Months", __typename: "Duration" },
      relativePosition: "After",
      __typename: "EarliestDateValidationRule"
    }
  }
};

export const updateValidationRuleCustomDate = {
  data: {
    updateValidationRule: {
      id: "1",
      enabled: true,
      customDate: "1985-09-14",
      offset: { value: 5, unit: "Months", __typename: "Duration" },
      relativePosition: "After",
      __typename: "EarliestDateValidationRule"
    }
  }
};
