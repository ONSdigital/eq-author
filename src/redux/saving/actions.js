export const START_REQUEST = "START_REQUEST";
export const END_REQUEST = "END_REQUEST";

export const startRequest = () => ({
  type: START_REQUEST
});

export const endRequest = () => ({
  type: END_REQUEST
});
