export const FIELD_ENABLE = "FIELD_ENABLE";
export const FIELD_DISABLE = "FIELD_DISABLE";

export const FIELD_FOCUS = "FIELD_FOCUS";
export const FIELD_BLUR = "FIELD_BLUR";

export const enableField = payload => ({
  type: FIELD_ENABLE,
  payload
});

export const disableField = payload => ({
  type: FIELD_DISABLE,
  payload
});

export const focusField = payload => ({
  type: FIELD_FOCUS,
  payload
});

export const blurField = payload => ({
  type: FIELD_BLUR,
  payload
});
