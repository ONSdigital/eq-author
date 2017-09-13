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
import getIdFromObject from "utils/getIdFromObject";

import withDeleteAnswer from "containers/Enhancers/withDeleteAnswer";
import withCreateAnswer from "containers/Enhancers/withCreateAnswer";
import withUpdateAnswer from "containers/Enhancers/withUpdateAnswer";
import withCreateOption from "containers/Enhancers/withCreateOption";
import withUpdateOption from "containers/Enhancers/withUpdateOption";
import withDeleteOption from "containers/Enhancers/withDeleteOption";

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

  isFocused(entity) {
    return this.props.focused === getIdFromObject(entity);
  }

  render() {
    const {
      page,
      onUpdatePage,
      onUpdateAnswer,
      onAddAnswer,
      onAddOption,
      onUpdateOption,
      onDeleteOption,
      onFocus
    } = this.props;

    return (
      <div id="question-page-editor">
        <CanvasSection
          id={getIdFromObject(page)}
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
          {page.answers.map(answer =>
            <SlideTransition key={getIdFromObject(answer)}>
              <CanvasSection
                id={getIdFromObject(answer)}
                key={getIdFromObject(answer)}
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
          )}
        </TransitionGroup>
        <BasicSection>
          <AnswerTypeSelector onSelect={onAddAnswer} />
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
