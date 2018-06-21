import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { dropRightWhile, first, last, get } from "lodash";
import { TransitionGroup } from "react-transition-group";

import Transition from "components/routing/Transition";
import Loading from "components/Loading";
import RoutingRuleSet from "components/routing/RoutingRuleSet";
import RoutingRuleSetEmpty from "components/routing/RoutingRuleSetEmptyMsg";

import { CHECKBOX, RADIO } from "constants/answer-types";
import { colors } from "constants/theme";
import CustomPropTypes from "custom-prop-types";
import isAnswerValidForRouting from "./isAnswerValidForRouting";

const Title = styled.h2`
  padding: 0.5em 1em;
  color: #666;
  font-size: 1.4em;
  border-bottom: 1px solid ${colors.lightGrey};
  margin: 0;
`;

const Padding = styled.div`
  padding: 2em;
`;

const getPagesAvailableForRouting = (sections, sectionId, pageId) => {
  const filteredSections = dropRightWhile(sections, s => s.id !== sectionId);
  const currentSection = last(filteredSections);

  filteredSections[filteredSections.length - 1] = {
    ...currentSection,
    pages: dropRightWhile(currentSection.pages, p => p.id !== pageId)
  };

  return filteredSections;
};

const determineCanRoute = routingRuleSet =>
  routingRuleSet &&
  routingRuleSet.routingRules.every(rule =>
    rule.conditions.every(condition =>
      isAnswerValidForRouting(get(condition, "answer"))
    )
  );

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
    }),
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
    this.props.onAddRoutingCondition(rule.id, answer.id);
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

  render() {
    const {
      questionnaire,
      currentPage,
      availableRoutingDestinations,
      onAddRoutingRuleSet,
      match,
      ...otherProps
    } = this.props;

    // when new section is added, this component re-renders before
    // the redirect, causing currentPage to be undefined/null
    if (!currentPage) {
      return <Loading height="38rem">Loading…</Loading>;
    }

    const { routingRuleSet } = currentPage;

    const pagesAvailableForRouting = getPagesAvailableForRouting(
      questionnaire.sections,
      match.params.sectionId,
      match.params.pageId
    );

    return (
      <React.Fragment>
        <Title>{get(currentPage, "plaintextTitle") || "Page Title"}</Title>
        <Padding>
          <TransitionGroup>
            {routingRuleSet ? (
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
            ) : (
              <Transition key="routing-rule-set-empty" exit={false}>
                <div>
                  <RoutingRuleSetEmpty
                    title="No routing rules exist for this question"
                    onAddRuleSet={onAddRoutingRuleSet}
                  />
                </div>
              </Transition>
            )}
          </TransitionGroup>
        </Padding>
      </React.Fragment>
    );
  }
}

export default RoutingEditor;
