export const DEFINITION_UPDATE = "DEFINITION_UPDATE";
export const INFO_UPDATE = "INFO_UPDATE";

export const updateDefinition = args => ({
  type: DEFINITION_UPDATE,
  payload: {
    ...args
  }
});

export const updateAdditionalInfo = (id, name, value) => {
  return {
    type: INFO_UPDATE,
    payload: {
      id,
      name,
      value
    }
  };
};
