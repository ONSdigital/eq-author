import React, { cloneElement, Component, Children } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomPropTypes from "custom-prop-types";
import { storiesOf } from "@storybook/react";
import { random } from "lodash";

import styled from "styled-components";

import QuestionnaireNav from "components/QuestionnaireNav";

const Wrapper = styled.div`width: 20em;`;

const questionnaire = {
  id: 1,
  sections: [
    {
      title: "Section 1",
      id: 0,
      pages: [
        {
          title: "Question 1.1",
          id: 2
        }
      ]
    }
  ]
};

class QuestionnaireNavWithState extends Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire
  };

  constructor(props) {
    super(props);
    this.state = {
      questionnaire: props.questionnaire
    };
  }

  getNewPage = (sectionId, pageId) => ({
    id: random(100),
    title: `Question ${sectionId + 1}.${pageId}`
  });

  handleAddPageClick = sectionId => {
    const questionnaire = {
      ...this.state.questionnaire
    };

    const newPage = this.getNewPage(
      sectionId,
      questionnaire.sections[sectionId].pages.length + 1
    );

    questionnaire.sections[sectionId].pages.push(newPage);

    this.setState({ questionnaire });
  };

  handleAddSectionClick = () => {
    const id = questionnaire.sections.length;
    const section = {
      id,
      title: `Section ${id + 1}`,
      pages: [this.getNewPage(id, 1)]
    };

    questionnaire.sections.push(section);
    this.setState({ questionnaire });
  };

  render() {
    return (
      <QuestionnaireNav
        questionnaire={questionnaire}
        onAddPageClick={this.handleAddPageClick}
        onAddSectionClick={this.handleAddSectionClick}
      />
    );
  }
}

storiesOf("QuestionnaireNav", module)
  .addDecorator(story =>
    <Wrapper>
      {story()}
    </Wrapper>
  )
  .add("Default", () => {
    return <QuestionnaireNavWithState questionnaire={questionnaire} />;
  });
