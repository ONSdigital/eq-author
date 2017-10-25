import React from "react";
import AnswerTypeSelector from "components/AnswerTypeSelector";
import AnswerEditor from "components/AnswerEditor";
import MetaEditor from "./MetaEditor";
import CanvasSection, {
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

export class QPE extends React.Component {
  static propTypes = {
    onUpdateAnswer: PropTypes.func.isRequired,
    onUpdatePage: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    onDeleteAnswer: PropTypes.func.isRequired,
    onUpdateOption: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    titleRef: PropTypes.func,
    page: CustomPropTypes.page,
    focused: PropTypes.string
  };

  handleDeleteAnswer = answerId => {
    this.props.onDeleteAnswer(this.props.page.id, answerId);
  };

  handleAddAnswer = answerType => {
    return this.props.onAddAnswer(answerType).then(focusOnEntity);
  };

  isFocused(entity) {
    return this.props.focused === getIdForObject(entity);
  }

  render() {
    const {
      page,
      onUpdatePage,
      onUpdateAnswer,
      onAddOption,
      onUpdateOption,
      onDeleteOption,
      onFocus
    } = this.props;

    return (
      <div id="question-page-editor">
        <CanvasSection
          id={getIdForObject(page)}
          onFocus={onFocus}
          isFocused={this.isFocused(page)}
        >
          <MetaEditor
            onUpdate={onUpdatePage}
            page={page}
            titleRef={this.props.titleRef}
          />
        </CanvasSection>
        <TransitionGroup>
          {page.answers.map(answer => (
            <SlideTransition key={getIdForObject(answer)}>
              <CanvasSection
                id={getIdForObject(answer)}
                key={getIdForObject(answer)}
                onFocus={onFocus}
                isFocused={this.isFocused(answer)}
              >
                <AnswerEditor
                  answer={answer}
                  onUpdate={onUpdateAnswer}
                  onAddOption={onAddOption}
                  onUpdateOption={onUpdateOption}
                  onDeleteOption={onDeleteOption}
                  onDeleteAnswer={this.handleDeleteAnswer}
                />
              </CanvasSection>
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
  withCreateAnswer,
  withUpdateAnswer,
  withDeleteAnswer,
  withCreateOption,
  withUpdateOption,
  withDeleteOption
)(QPE);
