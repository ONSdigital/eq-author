import React from "react";
import AnswerTypeSelector from "components/AnswerTypeSelector";
import AnswerEditor from "components/AnswerEditor";
import MetaEditor from "./MetaEditor";
import ConnectedCanvasSection, {
  BasicSection
} from "components/EditorSurface/CanvasSection";
import SlideTransition from "components/SlideTransition";
import { TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { compose } from "react-apollo";
import CustomPropTypes from "custom-prop-types";
import getIdForObject from "utils/getIdForObject";
import focusOnEntity from "utils/focusOnEntity";

import withDeleteAnswer from "containers/enhancers/withDeleteAnswer";
import withCreateAnswer from "containers/enhancers/withCreateAnswer";
import withUpdateAnswer from "containers/enhancers/withUpdateAnswer";
import withCreateOption from "containers/enhancers/withCreateOption";
import withUpdateOption from "containers/enhancers/withUpdateOption";
import withDeleteOption from "containers/enhancers/withDeleteOption";

import * as ToastActionCreators from "redux/toast/actions";
import { connect } from "react-redux";

export class QPE extends React.Component {
  static propTypes = {
    onUpdateAnswer: PropTypes.func.isRequired,
    onUpdatePage: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    onDeleteAnswer: PropTypes.func.isRequired,
    onUpdateOption: PropTypes.func.isRequired,
    titleRef: PropTypes.func,
    page: CustomPropTypes.page
  };

  handleDeleteAnswer = answerId => {
    this.props.onDeleteAnswer(this.props.page.id, answerId);
  };

  handleAddAnswer = answerType => {
    return this.props.onAddAnswer(answerType).then(focusOnEntity);
  };

  render() {
    const {
      page,
      onUpdatePage,
      onUpdateAnswer,
      onAddOption,
      onUpdateOption,
      onDeleteOption
    } = this.props;

    return (
      <div id="question-page-editor">
        <ConnectedCanvasSection id={getIdForObject(page)}>
          <MetaEditor
            onUpdate={onUpdatePage}
            page={page}
            titleRef={this.props.titleRef}
          />
        </ConnectedCanvasSection>
        <TransitionGroup>
          {page.answers.map(answer => (
            <SlideTransition key={getIdForObject(answer)}>
              <ConnectedCanvasSection
                id={getIdForObject(answer)}
                key={getIdForObject(answer)}
              >
                <AnswerEditor
                  answer={answer}
                  onUpdate={onUpdateAnswer}
                  onAddOption={onAddOption}
                  onUpdateOption={onUpdateOption}
                  onDeleteOption={onDeleteOption}
                  onDeleteAnswer={this.handleDeleteAnswer}
                />
              </ConnectedCanvasSection>
            </SlideTransition>
          ))}
        </TransitionGroup>
        <BasicSection>
          <AnswerTypeSelector onSelect={this.handleAddAnswer} />
        </BasicSection>
      </div>
    );
  }
}

export default compose(
  connect(null, ToastActionCreators),
  withCreateAnswer,
  withUpdateAnswer,
  withDeleteAnswer,
  withCreateOption,
  withUpdateOption,
  withDeleteOption
)(QPE);
