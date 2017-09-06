import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";
import DeleteButton from "components/DeleteButton";
import TextAnswer from "components/Answers/TextAnswer";
import CheckboxAnswer from "components/Answers/CheckboxAnswer";
import { TEXTFIELD, CHECKBOX } from "constants/answer-types";

const AnswerDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: .5em;
  top: .4em;
`;

class AnswerEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: props.answer
    };
  }

  componentWillReceiveProps({ answer }) {
    if (answer.id !== this.props.answer.id) {
      this.setState({ answer });
    }
  }

  handleChange = ({ name, value }) => {
    this.setState({
      answer: {
        ...this.state.answer,
        [name]: value
      }
    });
  };

  handleBlur = e => {
    this.props.onChange(this.state.answer);
  };

  handleDeleteAnswer = () => {
    this.props.onDeleteAnswer(this.props.answer.id);
  };

  getRenderedAnswer(type) {
    switch (type) {
      case TEXTFIELD:
        return TextAnswer;
      case CHECKBOX:
        return CheckboxAnswer;
      default:
        return null;
    }
  }

  render() {
    const Answer = this.getRenderedAnswer(this.props.answer.type);

    const { onAddOption, onUpdateOption, onDeleteOption, onFocus } = this.props;

    return (
      <div>
        <Answer
          answer={this.props.answer}
          onChange={this.handleChange}
          onAddOption={onAddOption}
          onUpdateOption={onUpdateOption}
          onDeleteOption={onDeleteOption}
          onFocus={onFocus}
          onBlur={this.handleBlur}
        />
        <AnswerDeleteButton
          onClick={this.handleDeleteAnswer}
          title="Delete answer"
          type="button"
        />
      </div>
    );
  }
}

AnswerEditor.propTypes = {
  answer: CustomPropTypes.answer,
  answerIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddOption: PropTypes.func.isRequired,
  onDeleteOption: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
  // onEntered: PropTypes.func.isRequired
};

export default AnswerEditor;
