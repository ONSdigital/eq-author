import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CustomPropTypes from "custom-prop-types";
import QuestionnaireMenu from "components/QuestionnaireMenu";
import { withApollo } from "react-apollo";
import { MenuButton as RMLMenuButton } from "react-menu-list";
import { withRouter } from "react-router-dom";
import iconPiping from "./icon-piping.svg";
import { take, findIndex } from "lodash";
import query from "graphql/getQuestionnairePiping.graphql";
import { TEXTAREA, TEXTFIELD, NUMBER, CURRENCY } from "constants/answer-types";

const validAnswerTypes = {
  [TEXTAREA]: true,
  [TEXTFIELD]: true,
  [NUMBER]: true,
  [CURRENCY]: true
};

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5em;
  cursor: pointer;
  appearance: none;
  border: none;
  opacity: 0.9;
  transition: opacity 200ms ease-out;
  background: transparent url(${props => props.icon}) no-repeat center;
  width: 3.5em;
  height: 3.5em;

  &:hover {
    opacity: 1;
  }

  &[disabled] {
    opacity: 0.5;
  }
`;

const MenuButton = Button.withComponent(RMLMenuButton).extend`
  &:disabled {
    cursor: default;
    opacity: 0.2;
  }
`;

export class Menu extends React.Component {
  static propTypes = {
    client: CustomPropTypes.apolloClient.isRequired,
    onItemChosen: PropTypes.func.isRequired,
    match: CustomPropTypes.match,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);

    const { questionnaire } = props.client.readQuery({
      query,
      variables: { id: props.match.params.questionnaireId }
    });

    this.state = {
      questionnaire: this.filterQuestionnaire(questionnaire)
    };
  }

  filterQuestionnaire(questionnaire) {
    const { sectionId, pageId } = this.props.match.params;

    const currentSectionIndex = findIndex(questionnaire.sections, {
      id: sectionId
    });
    const currentSection = questionnaire.sections[currentSectionIndex];
    const currentPageIndex = findIndex(currentSection.pages, { id: pageId });

    // can't pipe anything on first page of first section
    if (currentSectionIndex === 0 && currentPageIndex === 0) {
      return;
    }

    currentSection.pages = take(currentSection.pages, currentPageIndex);
    questionnaire.sections = take(
      questionnaire.sections,
      currentPageIndex === 0 ? currentSectionIndex : currentSectionIndex + 1 // if first page of section, no need to show section
    );

    return {
      sections: questionnaire.sections.map(section => ({
        ...section,
        pages: section.pages.map(page => ({
          ...page,
          answers: page.answers.filter(answer => validAnswerTypes[answer.type])
        }))
      }))
    };
  }

  render() {
    const { questionnaire } = this.state;
    const { disabled } = this.props;

    const menu = (
      <QuestionnaireMenu
        {...this.props}
        questionnaire={questionnaire}
        menuZIndex={10}
      />
    );

    return (
      <MenuButton
        menuZIndex={10}
        menu={menu}
        disabled={disabled || !questionnaire}
        icon={iconPiping}
      />
    );
  }
}

export default withApollo(withRouter(Menu));
