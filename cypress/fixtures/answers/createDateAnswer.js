export default {
  data: {
    createAnswer: {
      id: "1",
      description: "",
      guidance: "",
      label: "",
      type: "Date",
      properties: { format: "dd/mm/yyyy", required: false },
      __typename: "BasicAnswer",
      validation: {
        earliestDate: {
          id: "1",
          enabled: false,
          customDate: null,
          offset: { value: 0, unit: "Days", __typename: "Duration" },
          relativePosition: "Before",
          __typename: "EarliestDateValidationRule"
        },
        __typename: "DateValidation"
      }
    }
  }
};
