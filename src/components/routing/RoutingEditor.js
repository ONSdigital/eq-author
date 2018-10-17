import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { dropRightWhile, first, last, get, isEmpty } from "lodash";
import { TransitionGroup } from "react-transition-group";

import Transition from "components/routing/Transition";
import Loading from "components/Loading";
import RoutingRuleSet from "components/routing/RoutingRuleSet";
import RoutingRuleSetMsg from "components/routing/RoutingRuleSetMsg";

import { colors, radius } from "constants/theme";
import CustomPropTypes from "custom-prop-types";

const panelCSS = css`
  background: ${colors.white};
  border: 1px solid ${colors.bordersLight};
  border-radius: ${radius};
`;

const Header = styled.div`
  ${panelCSS};
  padding: 1.5em 2em;
  border-bottom: none;
  border-radius: ${radius} ${radius} 0 0;
`;

const SubTitle = styled.div`
  color: #666;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 0.2em;
`;

const Title = styled.h2`
  color: ${colors.text};
  font-size: 1.4em;
  margin: 0;
`;

const stripTags = html => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export const getPagesAvailableForRouting = (sections, sectionId, pageId) => {
  if (isEmpty(sections)) {
    return [];
  }

  const filteredSections = dropRightWhile(sections, s => s.id !== sectionId);
  const currentSection = last(filteredSections);

  filteredSections[filteredSections.length - 1] = {
    ...currentSection,
    pages: dropRightWhile(currentSection.pages, p => p.id !== pageId)
  };

  return filteredSections;
};

class RoutingEditor extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire.isRequired,
    currentPage: CustomPropTypes.page.isRequired,
    onAddRoutingRuleSet: PropTypes.func.isRequired,
    onAddRoutingCondition: PropTypes.func.isRequired,
    onDeleteRoutingRule: PropTypes.func.isRequired,
    onUpdateRoutingRule: PropTypes.func.isRequired,
    onUpdateRoutingRuleSet: PropTypes.func.isRequired,
    onDeleteRoutingRuleSet: PropTypes.func.isRequired,
    availableRoutingDestinations: PropTypes.shape({
      logicalDestinations: PropTypes.arrayOf(PropTypes.any),
      questionPages: PropTypes.arrayOf(CustomPropTypes.page),
      sections: PropTypes.arrayOf(CustomPropTypes.section)
    }).isRequired,
    match: CustomPropTypes.match
  };

  handleElseChange = value => {
    this.props.onUpdateRoutingRuleSet(value);
  };

  handleThenChange = value => {
    this.props.onUpdateRoutingRule(value);
  };

  handleAddCondition = rule => {
    const answer = first(this.props.currentPage.answers);
    this.props.onAddRoutingCondition(rule.id, answer && answer.id);
  };

  handleDeleteRule = rule => {
    const {
      currentPage,
      onDeleteRoutingRule,
      onDeleteRoutingRuleSet
    } = this.props;
    const { routingRuleSet } = currentPage;

    routingRuleSet.routingRules.length > 1
      ? onDeleteRoutingRule(routingRuleSet.id, rule.id)
      : onDeleteRoutingRuleSet(routingRuleSet.id, currentPage.id);
  };

  renderEmptyRuleSet() {
    const { onAddRoutingRuleSet } = this.props;
    return (
      <Transition key="routing-rule-set-empty" exit={false}>
        <RoutingRuleSetMsg
          title="No routing rules exist for this question"
          onAddRuleSet={onAddRoutingRuleSet}
          data-test="routing-rule-set-empty-msg"
        >
          Users completing this question will be taken to the next page.
        </RoutingRuleSetMsg>
      </Transition>
    );
  }

  renderRoutingRuleSet() {
    const {
      questionnaire,
      currentPage,
      availableRoutingDestinations,
      match,
      ...otherProps
    } = this.props;

    const pagesAvailableForRouting = getPagesAvailableForRouting(
      questionnaire.sections,
      match.params.sectionId,
      match.params.pageId
    );

    const { routingRuleSet } = currentPage;

    return (
      <Transition key="routing-rule-set" exit={false}>
        <div>
          <RoutingRuleSet
            {...otherProps}
            ruleSet={routingRuleSet}
            destinations={availableRoutingDestinations}
            pagesAvailableForRouting={pagesAvailableForRouting}
            onElseChange={this.handleElseChange}
            onAddRoutingCondition={this.handleAddCondition}
            onDeleteRule={this.handleDeleteRule}
            onThenChange={this.handleThenChange}
            match={match}
          />
        </div>
      </Transition>
    );
  }

  render() {
    const { currentPage } = this.props;

    // when new section is added, this component re-renders before
    // the redirect, causing currentPage to be undefined/null
    if (!currentPage) {
      return <Loading height="38rem">Loading…</Loading>;
    }

    const { routingRuleSet } = currentPage;

    let content;

    if (routingRuleSet) {
      content = this.renderRoutingRuleSet();
    } else {
      content = this.renderEmptyRuleSet();
    }

    return (
      <div data-test="routing-editor">
        <Header>
          <SubTitle>
            Route out of page: {get(currentPage, "displayName")}
          </SubTitle>
          <Title>{stripTags(get(currentPage, "title", "Untitled Page"))}</Title>
        </Header>

        <TransitionGroup>{content}</TransitionGroup>
      </div>
    );
  }
}

export default RoutingEditor;
