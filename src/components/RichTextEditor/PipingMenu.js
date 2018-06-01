import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CustomPropTypes from "custom-prop-types";
import QuestionnaireMenu from "components/QuestionnaireMenu";
import { withApollo } from "react-apollo";
import { MenuButton as RMLMenuButton } from "react-menu-list";
import { withRouter } from "react-router-dom";
import IconPiping from "./icon-piping.svg?inline";
import { take, findIndex, flatten } from "lodash";
import query from "graphql/getQuestionnairePiping.graphql";
import {
  TEXTAREA,
  TEXTFIELD,
  NUMBER,
  CURRENCY,
  DATE_RANGE
} from "constants/answer-types";
import ToolbarButton from "./ToolbarButton";
import VisuallyHidden from "../VisuallyHidden";

const validAnswerTypes = {
  [TEXTAREA]: true,
  [TEXTFIELD]: true,
  [NUMBER]: true,
  [CURRENCY]: true,
  [DATE_RANGE]: true
};

const PipingIconButton = props => (
  <ToolbarButton {...props}>
    <IconPiping />
    <VisuallyHidden>Pipe value</VisuallyHidden>
  </ToolbarButton>
);

const MenuButton = styled(RMLMenuButton)`
  height: 100%;
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
          answers: this.filterAnswers(page.answers)
        }))
      }))
    };
  }

  filterAnswers(answers) {
    return flatten(
      answers.map(answer => {
        if (answer.__typename === "CompositeAnswer") {
          return answer.childAnswers;
        }
        return answer;
      })
    ).filter(answer => validAnswerTypes[answer.type]);
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
        ButtonComponent={PipingIconButton}
      />
    );
  }
}

export default withApollo(withRouter(Menu));
