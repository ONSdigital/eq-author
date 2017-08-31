import { compose } from "react-apollo";
import { connect } from "react-redux";

// import withAnswer from "../Enhancers/withAnswer";
import withDeleteAnswer from "../Enhancers/withDeleteAnswer";
import withCreateOption from "../Enhancers/withCreateOption";
import withDeleteOption from "../Enhancers/withDeleteOption";

import AnswerEditor from "components/AnswerEditor";

const mapStateToProps = (_, ownProps) => {
  return {
    ...ownProps
  };
};

export default compose(
  connect(mapStateToProps),
  // withAnswer,    // Can't get this to work :(
  withDeleteAnswer,
  withCreateOption,
  withDeleteOption
)(AnswerEditor);
