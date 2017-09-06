import React from "react";
import AnswerTypeSelector from "components/AnswerTypeSelector";
import AnswerEditor from "components/AnswerEditor";
import MetaEditor from "./MetaEditor";
import CanvasSection from "components/EditingSurface/CanvasSection";
import PropTypes from "prop-types";
import { compose } from "react-apollo";
import CustomPropTypes from "custom-prop-types";

import withDeleteAnswer from "containers/Enhancers/withDeleteAnswer";
import withCreateAnswer from "containers/Enhancers/withCreateAnswer";
import withUpdateAnswer from "containers/Enhancers/withUpdateAnswer";
import withCreateOption from "containers/Enhancers/withCreateOption";
import withUpdateOption from "containers/Enhancers/withUpdateOption";
import withDeleteOption from "containers/Enhancers/withDeleteOption";

class QuestionPageEditor extends React.Component {
  static propTypes = {
    onUpdatePage: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    onDeleteAnswer: PropTypes.func.isRequired,
    page: CustomPropTypes.page
  };

  handleDeleteAnswer = answerId => {
    this.props.onDeleteAnswer(this.props.page.id, answerId);
  };

  render() {
    const {
      page,
      onUpdatePage,
      onAddAnswer,
      onAddOption,
      onDeleteOption
    } = this.props;
    const { answers } = page;
    const onFocus = () => {};
    const onBlur = () => {};
    const onChange = () => {};
    const focused = "meh";

    return (
      <div>
        <CanvasSection
          id="page"
          onFocus={onFocus}
          onBlur={onBlur}
          focused={focused === "page"}
        >
          <MetaEditor onChange={onUpdatePage} page={page} />
        </CanvasSection>

        {answers.map((answer, answerIndex) =>
          <CanvasSection
            id={`answer-${answer.id}`}
            key={answer.id}
            onFocus={onFocus}
            onBlur={onBlur}
            focused={focused && focused.indexOf(`answer-${answer.id}`) > -1}
          >
            <AnswerEditor
              answer={answer}
              answerIndex={answerIndex}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onEntered={this.handleEntered}
              onAddOption={onAddOption}
              onDeleteOption={onDeleteOption}
              onDeleteAnswer={this.handleDeleteAnswer}
            />
          </CanvasSection>
        )}
        <CanvasSection onFocus={onFocus} onBlur={onBlur}>
          <AnswerTypeSelector onSelect={onAddAnswer} />
        </CanvasSection>
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
)(QuestionPageEditor);
