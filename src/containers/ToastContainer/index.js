import React from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import * as ToastActionCreators from "actionCreators/toast";
import * as UndeleteQuestionnaireActions from "actionCreators/undelete/undeleteQuestionnaire";
import * as UndeleteSectionActions from "actionCreators/undelete/undeleteSection";
import * as UndeletePageActions from "actionCreators/undelete/undeletePage";
import * as UndeleteAnswerActions from "actionCreators/undelete/undeleteAnswer";
import Toast from "components/Toast";
import ToastList from "components/Toast/ToastList";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "constants/theme";

const mapStateToProps = state => {
  return {
    toasts: state.toasts
  };
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UndoButton = styled.button`
  background: none;
  border: none;
  color: ${colors.lightBlue};
  margin-left: 2em;
  font-size: inherit;
`;

const ToastOuterContainer = styled.div`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  margin-bottom: ${props => (props.hasMargin ? "0.5em" : "0")};
`;

const ToastInnerContainer = styled.div`
  display: inline-block;
  text-align: initial;
`;

const ToastArea = ({ toasts, dismissToast, undoToast, ...otherProps }) => {
  return (
    <ToastOuterContainer>
      <ToastInnerContainer>
        <ToastList>
          {map(toasts, (toast, id) => (
            <Toast key={id} id={id} timeout={5000} onClose={dismissToast}>
              <StyledDiv>
                {toast.message}
                <UndoButton
                  onClick={function() {
                    undoToast(id, otherProps[toast.undoAction], toast.context);
                  }}
                >
                  Undo
                </UndoButton>
              </StyledDiv>
            </Toast>
          ))}
        </ToastList>
      </ToastInnerContainer>
    </ToastOuterContainer>
  );
};

ToastArea.propTypes = {
  toasts: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dismissToast: PropTypes.func.isRequired,
  undoToast: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  Object.assign(
    {},
    UndeleteQuestionnaireActions,
    UndeleteSectionActions,
    UndeletePageActions,
    UndeleteAnswerActions,
    ToastActionCreators
  )
)(ToastArea);
