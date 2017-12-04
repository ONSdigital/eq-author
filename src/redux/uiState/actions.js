export const SECTION_FOCUS = "SECTION_FOCUS";

export const focusOnSection = id => ({
  type: SECTION_FOCUS,
  payload: {
    id
  }
});
