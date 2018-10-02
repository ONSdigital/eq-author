import fp from "lodash/fp";
import { takeWhile, dropRightWhile, last, get, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import ContentPickerModal from "components/ContentPickerModal";
import {
  TEXTAREA,
  TEXTFIELD,
  NUMBER,
  CURRENCY,
  DATE_RANGE
} from "constants/answer-types";
import CustomPropTypes from "custom-prop-types";

import IconPiping from "./icon-link.svg?inline";
import query from "./Piping.graphql";
import ToolbarButton from "./ToolbarButton";

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
  </ToolbarButton>
);

export const MenuButton = styled(PipingIconButton)`
  height: 100%;
  &:disabled {
    cursor: default;
    opacity: 0.2;
  }
`;

const getAnswer = answer => {
  if (answer.__typename === "CompositeAnswer") {
    return answer.childAnswers;
  }
  return answer;
};

const isValidType = ({ type }) => validAnswerTypes[type];

const filterAnswers = fp.flow(
  fp.map(getAnswer),
  fp.flatten,
  fp.filter(isValidType)
);

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

  state = {
    isPickerOpen: false
  };

  handleButtonClick = () => {
    this.setState(state => ({
      isPickerOpen: !state.isPickerOpen
    }));
  };

  handlePickerClose = () => {
    this.setState({
      isPickerOpen: false
    });
  };

  handlePickerSubmit = (...args) => {
    this.handlePickerClose();
    this.props.onItemChosen(...args);
  };

  filterQuestionnaire(questionnaire) {
    const { sectionId, pageId } = this.props.match.params;

    // show nothing if first page of first section
    if (get(questionnaire, "sections[0].pages[0].id") === pageId) {
      return [];
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

    return sections.map(section => ({
      ...section,
      pages: section.pages.map(page => ({
        ...page,
        answers: filterAnswers(page.answers)
      }))
    }));
  }

  render() {
    const { disabled, loading, data } = this.props;
    const buttonProps = {
      title: "Pipe value"
    };

    if (loading || disabled || !data.questionnaire) {
      return <MenuButton {...buttonProps} disabled />;
    }

    const { questionnaire } = data;

    const filteredSections = this.filterQuestionnaire(questionnaire);

    const isDisabled =
      filteredSections.length === 0 && questionnaire.metadata.length === 0;

    return (
      <React.Fragment>
        <MenuButton
          {...buttonProps}
          disabled={isDisabled}
          onClick={this.handleButtonClick}
          data-test="piping-button"
        />
        <ContentPickerModal
          isOpen={this.state.isPickerOpen}
          answerData={filteredSections}
          metadataData={questionnaire.metadata}
          onClose={this.handlePickerClose}
          onSubmit={this.handlePickerSubmit}
          data-test="picker"
        />
      </React.Fragment>
    );
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
