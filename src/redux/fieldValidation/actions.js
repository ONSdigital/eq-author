export const FIELD_VALID = "FIELD_VALID";
export const FIELD_INVALID = "FIELD_INVALID";
export const FIELDS_VALID = "FIELD_VALID";
export const FIELDS_INVALID = "FIELDS_INVALID";

export const fieldValid = (pageId, fieldId) => ({
  type: FIELD_VALID,
  payload: {
    pageId,
    fieldId
  }
});

export const fieldsValid = (pageId, fieldIds) => ({
  type: FIELDS_VALID,
  payload: {
    pageId,
    fieldIds
  }
});

export const fieldInvalid = (pageId, fieldId) => ({
  type: FIELD_INVALID,
  payload: {
    pageId,
    fieldId
  }
});

export const fieldsInvalid = (pageId, fieldIds) => ({
  type: FIELDS_INVALID,
  payload: {
    pageId,
    fieldIds
  }
});
