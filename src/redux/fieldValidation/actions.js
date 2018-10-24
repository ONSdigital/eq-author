export const FIELD_VALID = "FIELD_VALID";
export const FIELD_INVALID = "FIELD_INVALID";
export const FIELDS_VALID = "FIELDS_VALID";
export const FIELDS_INVALID = "FIELDS_INVALID";
export const APP_INVALID = "APP_INVALID";
export const APP_VALID = "APP_VALID";
export const PAGE_VALID = "PAGE_VALID";

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

export const fieldsInvalid = (pageId, fieldIds) => ({
  type: FIELDS_INVALID,
  payload: {
    pageId,
    fieldIds
  }
});

export const fieldsValid = (pageId, fieldIds) => ({
  type: FIELDS_VALID,
  payload: {
    pageId,
    fieldIds
  }
});

export const pageValid = pageId => ({
  type: PAGE_VALID,
  payload: {
    pageId
  }
});

export const appInvalid = () => ({
  type: APP_INVALID
});

export const appValid = () => ({
  type: APP_VALID
});
