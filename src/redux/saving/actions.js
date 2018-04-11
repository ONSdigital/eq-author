export const START_REQUEST = "START_REQUEST";
export const END_REQUEST = "END_REQUEST";

export const startRequest = error => {
  return {
    type: START_REQUEST
  };
};

export const endRequest = error => {
  return {
    type: END_REQUEST
  };
};
