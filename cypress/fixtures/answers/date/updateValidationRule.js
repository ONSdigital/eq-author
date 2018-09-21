export const updateValidationRuleOffsetValue = (id, __typename) => ({
  data: {
    updateValidationRule: {
      id,
      enabled: true,
      customDate: null,
      offset: { value: 5, unit: "Days", __typename: "Duration" },
      relativePosition: "Before",
      __typename
    }
  }
});

export const updateValidationRuleOffsetUnit = (id, __typename) => ({
  data: {
    updateValidationRule: {
      id,
      enabled: true,
      customDate: null,
      offset: { value: 5, unit: "Months", __typename: "Duration" },
      relativePosition: "Before",
      __typename
    }
  }
});

export const updateValidationRuleRelativePosition = (
  id,
  __typename,
  relativePosition
) => ({
  data: {
    updateValidationRule: {
      id,
      enabled: true,
      customDate: null,
      offset: { value: 5, unit: "Months", __typename: "Duration" },
      relativePosition,
      __typename
    }
  }
});

export const updateValidationRuleCustomDate = (id, __typename) => ({
  data: {
    updateValidationRule: {
      id,
      enabled: true,
      customDate: "1985-09-14",
      offset: { value: 5, unit: "Months", __typename: "Duration" },
      relativePosition: "After",
      __typename
    }
  }
});
