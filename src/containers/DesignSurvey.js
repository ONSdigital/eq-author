import { connect } from "react-redux";
import { clearSurvey } from "actions/survey";
import { updateItem, deleteItem } from "actions/survey/items";

import DesignSurveyPage from "pages/DesignSurvey";

export const getType = (params, surveyItems) => {
  return ["answers", "questions", "sections"]
    .map(type => {
      const id = params[`${type}Id`];
      if (id !== undefined) {
        return {
          type: type,
          id: id,
          item: surveyItems[type][id]
        };
      } else {
        return null;
      }
    })
    .filter(type => type)[0];
};

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.match;
  const { survey } = state;
  return {
    surveyItems: survey.items,
    selected: getType(params, survey.items),
    selectedSection: params.sectionsId &&
      survey.items.sections[params.sectionsId]
  };
};

export const mapDispatchToProps = {
  clearSurvey,
  deleteItem,
  onChange: ({ target }) => {
    let { type, value, checked, name } = target;
    if (type === "checkbox") {
      value = checked;
    }
    return updateItem(name, value);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignSurveyPage);
