import _, {merge} from 'lodash';
import * as actions from 'actions/sections';

const ids = [];
const getIdFromName = name => {
  const newId = name.replace(/\s+/g, '-').toLowerCase();
  ids.push(newId);
  return newId;
};

const getSectionById = (sections, id) =>
  _(sections).filter({id: id}).value()[0];

const sections = (state = {sections: []}, action) => {
  switch (action.type) {
    case actions.ADD_SECTION:
      return {
        sections: [
          ...state.sections,
          {
            id: getIdFromName(action.payload.name),
            name: action.payload.name,
            questions: [],
          },
        ],
      };

    case actions.ADD_QUESTION:
      return merge(
        {},
        state.sections,
        getSectionById(
          state.sections,
          action.payload.sectionID
        ).questions.push({
          id: getIdFromName(action.payload.name),
          name: action.payload.name,
          answers: [],
        })
      );

    case actions.ADD_ANSWER:
      _(state.sections)
        .map('questions')
        .flatten()
        .filter({id: action.payload.questionID})
        .value()[0]
        .answers.push({
          id: getIdFromName(action.payload.name),
          name: action.payload.name,
        });

      return merge(
        {},
        state.sections,
        getSectionById(state.sections, action.payload.sectionID)
      );

    default:
      return state;
  }
};

export default sections;
