import { compose } from "react-apollo";
import { connect } from "react-redux";
import { getUser } from "redux/auth/reducer";
import QuestionnaireCreatePage from "./QuestionnaireCreatePage";
import withCreateQuestionnaire from "containers/enhancers/withCreateQuestionnaire";

const mapStateToProps = state => ({
  user: getUser(state)
});

export default compose(connect(mapStateToProps), withCreateQuestionnaire)(
  QuestionnaireCreatePage
);
