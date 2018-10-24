import { connect } from "react-redux";
import { fieldValid, fieldInvalid } from "redux/fieldValidation/actions";

import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { includes } from "lodash";

const div = document.createElement("div");

const mapStateToProps = (state, ownProps) => {
  const {
    id: fieldId,
    match: {
      params: { pageId }
    }
  } = ownProps;

  return {
    valid: !includes(state.fieldValidation.errors[pageId], fieldId)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    onUpdate,
    required,
    id: fieldId,
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

      // return;

      if (required) {
        const valid = div.innerText.length > 0 || false;
        const action = valid ? fieldValid : fieldInvalid;

        dispatch(action(pageId, fieldId));
      }
    },
    onBlur: e => {
      if (onBlur) {
        onBlur(e);
      }

      // return;

      if (required) {
        const valid = e.target.value.length > 0 || false;
        const action = valid ? fieldValid : fieldInvalid;

        dispatch(action(pageId, fieldId));
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
