import React, { cloneElement, Component, Children } from "react";
import PropTypes from "prop-types";
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

class WithState extends Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    children: PropTypes.node.isRequired
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

    questionnaire.sections[sectionId].pages.push(
      this.getNewPage(
        sectionId,
        questionnaire.sections[sectionId].pages.length + 1
      )
    );

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
      <div>
        {Children.map(this.props.children, child =>
          cloneElement(child, {
            questionnaire: this.state.questionnaire,
            onAddPageClick: this.handleAddPageClick,
            onAddSectionClick: this.handleAddSectionClick
          })
        )}
      </div>
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
    return (
      <WithState questionnaire={questionnaire}>
        <QuestionnaireNav />
      </WithState>
    );
  });
