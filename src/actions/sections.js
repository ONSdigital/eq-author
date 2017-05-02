export const ADD_SECTION = 'ADD_SECTION';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';

export const addSection = name => {
  return {
    type: ADD_SECTION,
    payload: {
      name: name,
    },
  };
};

export const addQuestion = (name, sectionID) => {
  return {
    type: ADD_QUESTION,
    payload: {
      name: name,
      sectionID: sectionID,
    },
  };
};

export const addAnswer = (name, questionID, sectionID) => {
  return {
    type: ADD_ANSWER,
    payload: {
      name: name,
      questionID: questionID,
      sectionID: sectionID,
    },
  };
};
