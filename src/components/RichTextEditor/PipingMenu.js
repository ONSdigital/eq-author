import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import QuestionnaireMenu from "components/QuestionnaireMenu";
import IconPiping from "./icon-link.svg?inline";
import { Query } from "react-apollo";
import { MenuButton as RMLMenuButton } from "react-menu-list";
import { withRouter } from "react-router-dom";
import { takeWhile, dropRightWhile, last, get, isEmpty } from "lodash";
import query from "./Piping.graphql";
import { TEXTAREA, TEXTFIELD, NUMBER, CURRENCY } from "constants/answer-types";
import ToolbarButton from "./ToolbarButton";
import styled from "styled-components";

const validAnswerTypes = {
  [TEXTAREA]: true,
  [TEXTFIELD]: true,
  [NUMBER]: true,
  [CURRENCY]: true
};

const PipingIconButton = props => (
  <ToolbarButton {...props}>
    <IconPiping />
  </ToolbarButton>
);

const MenuButton = styled(RMLMenuButton).attrs({
  menuZIndex: 10,
  title: "Pipe value",
  ButtonComponent: () => PipingIconButton
})`
  height: 100%;
  &:disabled {
    cursor: default;
    opacity: 0.2;
  }
`;

export class Menu extends React.Component {
  static propTypes = {
    onItemChosen: PropTypes.func.isRequired,
    match: CustomPropTypes.match,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.shape({
      questionnaire: CustomPropTypes.questionnaire
    })
  };

  filterQuestionnaire(questionnaire) {
    const { sectionId, pageId } = this.props.match.params;

    if (!questionnaire) {
      return;
    }

    // show nothing if first page of first section
    if (get(questionnaire, "sections[0].pages[0].id") === pageId) {
      return;
    }

    const sections = dropRightWhile(
      questionnaire.sections,
      section => section.id !== sectionId
    );

    // only include pages up to the current
    const currentSection = last(sections);
    sections[sections.length - 1] = {
      ...currentSection,
      pages: takeWhile(currentSection.pages, page => page.id !== pageId)
    };

    // exclude current section if page is first in section
    if (isEmpty(last(sections).pages)) {
      sections.splice(sections.length - 1, 1);
    }

    return {
      sections: sections.map(section => ({
        ...section,
        pages: section.pages.map(page => ({
          ...page,
          answers: page.answers.filter(answer => validAnswerTypes[answer.type])
        }))
      }))
    };
  }

  render() {
    const { disabled, loading, data } = this.props;

    if (loading || disabled) {
      return <MenuButton disabled />;
    }

    const filteredQuestionnaire = this.filterQuestionnaire(data.questionnaire);
    const menu = (
      <QuestionnaireMenu
        {...this.props}
        questionnaire={filteredQuestionnaire}
        menuZIndex={10}
      />
    );

    return <MenuButton menu={menu} disabled={!filteredQuestionnaire} />;
  }
}

const PipingMenu = props => (
  <Query
    query={query}
    variables={{ id: props.match.params.questionnaireId }}
    skip={props.disabled}
  >
    {innerProps => <Menu {...innerProps} {...props} />}
  </Query>
);

PipingMenu.propTypes = {
  match: CustomPropTypes.match,
  disabled: PropTypes.bool
};

export default withRouter(PipingMenu);
