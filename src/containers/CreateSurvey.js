import { connect } from "react-redux";
import { updateMeta } from "actions/survey";

import CreateSurveyPage from "pages/CreateSurvey";

const mapStateToProps = (state, ownProps) => {
  return {
    meta: state.survey.meta,
    guidance: {
      informationToProvide: state.survey.items.blocks.introduction
        .information_to_provide
    }
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    onChange: e => {
      dispatch(updateMeta(e.target.name, e.target.value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurveyPage);
