export const FIELD_VALID = "FIELD_VALID";
export const FIELD_INVALID = "FIELD_INVALID";

export const fieldValid = (pageId, fieldId) => ({
  type: FIELD_VALID,
  payload: {
    pageId,
    fieldId
  }
});

export const fieldInvalid = (pageId, fieldId) => ({
  type: FIELD_INVALID,
  payload: {
    pageId,
    fieldId
  }
});
