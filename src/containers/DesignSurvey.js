import { connect } from "react-redux";
import { clearSurvey } from "actions/survey";
import { updateItem, removeItem } from "actions/survey/items";
import { push } from "react-router-redux";
import DesignSurveyPage from "pages/DesignSurvey";

const getType = (params, survey) => {
  return ["answers", "questions", "sections"]
    .map(type => {
      const id = params[`${type}Id`];
      if (typeof id !== undefined) {
        return {
          type: type,
          id: id,
          selected: survey[type][id]
        };
      } else {
        return null;
      }
    })
    .filter(type => type.id)[0];
};

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.match;
  const { items } = state.survey;
  return {
    surveyItems: items,
    selectedSection: items.sections[params.sectionsId],
    ...getType(params, items)
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    onChange: e => {
      var value = e.target.value;
      if (e.target.type === "checkbox") {
        value = e.target.checked;
      }
      dispatch(updateItem(e.target.name, value));
    },
    deleteItem: (type, id) => {
      dispatch(removeItem(type, id));
      dispatch(push("/design"));
    },
    deleteSurvey: () => {
      dispatch(clearSurvey());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: true
})(DesignSurveyPage);
