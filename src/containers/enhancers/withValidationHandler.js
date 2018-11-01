import { connect } from "react-redux";
import { fieldValid, fieldInvalid } from "redux/fieldValidation/actions";

import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { includes } from "lodash";

const div = document.createElement("div");

const mapStateToProps = (state, ownProps) => {
  const {
    id,
    match: {
      params: { pageId }
    }
  } = ownProps;

  return {
    valid: !includes(state.fieldValidation[pageId], id)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    onUpdate,
    required,
    id,
    onBlur,
    match: {
      params: { pageId }
    }
  } = ownProps;

  return {
    onUpdate: ({ name, value }) => {
      div.innerHTML = value;

      if (onUpdate) {
        onUpdate({ name, value });
      }

      if (required) {
        const valid = div.innerText.length > 0 || false;
        const action = valid ? fieldValid : fieldInvalid;

        dispatch(action(pageId, id));
      }
    },
    onBlur: e => {
      if (onBlur) {
        onBlur(e);
      }

      if (required) {
        const valid = e.target.value.length > 0 || false;
        const action = valid ? fieldValid : fieldInvalid;

        dispatch(action(pageId, id));
      }
    }
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
