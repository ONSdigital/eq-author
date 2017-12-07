export const CANVAS_SECTION_FOCUS = "CANVAS_SECTION_FOCUS";

export const focusOnSection = id => ({
  type: CANVAS_SECTION_FOCUS,
  payload: {
    id
  }
});
