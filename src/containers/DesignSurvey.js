import { connect } from "react-redux";
import { clearSurvey } from "actions/survey";
import { change, removeItem } from "actions/surveyItems";
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
  return {
    survey: state.survey,
    selectedSection: state.survey.sections[params.sectionsId],
    ...getType(params, state.survey)
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    onChange: e => {
      var value = e.target.value;
      if(e.target.type === "checkbox"){
        value = e.target.checked
      }
      dispatch(change(e.target.name, value));
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
