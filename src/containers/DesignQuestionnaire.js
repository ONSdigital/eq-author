import { connect } from "react-redux";
import { clearQuestionnaire } from "actions/questionnaire";
import { updateItem, deleteItem } from "actions/questionnaire/items";

import DesignQuestionnairePage from "pages/DesignQuestionnaire";

export const getType = (params, questionnaireItems) => {
  return ["answers", "questions", "sections"]
    .map(type => {
      const id = params[`${type}Id`];
      if (id !== undefined) {
        return {
          type: type,
          id: id,
          item: questionnaireItems[type][id]
        };
      } else {
        return null;
      }
    })
    .filter(type => type)[0];
};

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.match;
  const { questionnaire } = state;
  return {
    questionnaireItems: questionnaire.items,
    selected: getType(params, questionnaire.items),
    selectedSection:
      params.sectionsId && questionnaire.items.sections[params.sectionsId]
  };
};

export const mapDispatchToProps = {
  clearQuestionnaire,
  deleteItem,
  onChange: ({ target }) => {
    let { type, value, checked, name } = target;
    if (type === "checkbox") {
      value = checked;
    }
    return updateItem(name, value);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DesignQuestionnairePage
);
