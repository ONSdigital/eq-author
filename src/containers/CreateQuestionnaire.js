import { connect } from "react-redux";
import { updateMeta } from "actions/questionnaire/meta";

import CreateQuestionnairePage from "pages/CreateQuestionnaire";

const mapStateToProps = (state, ownProps) => {
  return {
    meta: state.questionnaire.meta,
    guidance: {
      informationToProvide:
        state.questionnaire.items.blocks.introduction.information_to_provide
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

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateQuestionnairePage
);
