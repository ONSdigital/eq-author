export const FIELD_ENABLE = "FIELD_ENABLE";
export const FIELD_DISABLE = "FIELD_DISABLE";

export const enableField = payload => ({
  type: FIELD_ENABLE,
  payload
});

export const disableField = payload => ({
  type: FIELD_DISABLE,
  payload
});
