import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { reject, concat } from "lodash";

import QuestionnaireDesign from "./index";

const fixture = {
  section: {
    id: 1,
    title: "Section title",
    description: "Section description"
  },
  page: {
    id: 1,
    title: "Question title",
    description: "Question description",
    guidance: "Question guidance"
  },
  onChange: action("change"),
  onFocus: action("focus"),
  onBlur: action("blur")
};

class Wrapper extends React.Component {
  constructor() {
    super();
    this.counter = 0;

    this.state = {
      answers: [this.createAnswer()]
    };
  }

  createAnswer = () => {
    return {
      id: ++this.counter,
      label: "Answer label"
    };
  };

  handleAddAnswer = () => {
    this.setState({
      answers: concat(this.state.answers, this.createAnswer())
    });
  };

  handleDeleteAnswer = id => {
    this.setState({
      answers: reject(this.state.answers, { id })
    });
  };

  render() {
    return (
      <QuestionnaireDesign
        {...fixture}
        answers={this.state.answers}
        onDeleteAnswer={this.handleDeleteAnswer}
        onAddAnswer={this.handleAddAnswer}
      />
    );
  }
}

storiesOf("QuestionnaireDesign", module).add("Deleting an answer", () =>
  <Wrapper />
);
