import Loading from "components/Loading";
import RoutingCondition from "components/routing/RoutingCondition";
import RoutingRule from "components/routing/RoutingRule";
import RoutingRuleset from "components/routing/RoutingRuleset";
import RoutingRulesetEmpty from "components/routing/RoutingRulesetEmptyMsg";
import Transition from "components/routing/Transition";
import { CHECKBOX, RADIO } from "constants/answer-types";
import { colors } from "constants/theme";
import CustomPropTypes from "custom-prop-types";
import { dropRightWhile, first, flatMap, get, map, negate, some } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import styled from "styled-components";

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

const none = negate(some);

const markFuturePagesAsDisabled = (sections, currentPage) => {
  const allPages = flatMap(sections, section => section.pages);
  const pagesBeforeCurrentPage = dropRightWhile(
    allPages,
    p => p.id !== currentPage.id
  );

  return map(sections, section => ({
    ...section,
    pages: map(section.pages, page => ({
      ...page,
      disabled: none(pagesBeforeCurrentPage, { id: page.id })
    }))
  }));
};

const determineCanRoute = routingRuleSet =>
  routingRuleSet &&
  routingRuleSet.routingRules.every(rule =>
    rule.conditions.every(condition => {
      const type = get(condition, "answer.type");
      return type === RADIO || type === CHECKBOX;
    })
  );

class UnconnectedRoutingEditor extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire.isRequired,
    currentPage: CustomPropTypes.page.isRequired,
    onAddRoutingRuleSet: PropTypes.func.isRequired,
    onAddRoutingCondition: PropTypes.func.isRequired,
    onDeleteRoutingCondition: PropTypes.func.isRequired,
    onAddRoutingRule: PropTypes.func.isRequired,
    onDeleteRoutingRule: PropTypes.func.isRequired,
    onToggleConditionOption: PropTypes.func.isRequired,
    onUpdateRoutingCondition: PropTypes.func.isRequired,
    onUpdateRoutingRule: PropTypes.func.isRequired,
    onUpdateRoutingRuleSet: PropTypes.func.isRequired,
    onDeleteRoutingRuleSet: PropTypes.func.isRequired,
    availableRoutingDestinations: PropTypes.shape({
      logicalDestinations: PropTypes.arrayOf(PropTypes.any),
      questionPages: PropTypes.arrayOf(CustomPropTypes.page),
      sections: PropTypes.arrayOf(CustomPropTypes.section)
    })
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
      onAddRoutingRule,
      onDeleteRoutingCondition,
      onUpdateRoutingCondition,
      onToggleConditionOption,
      match
    } = this.props;

    // when new section is added, this component re-renders before
    // the redirect, causing currentPage to be undefined/null
    if (!currentPage) {
      return <Loading height="38rem">Loading…</Loading>;
    }

    const { routingRuleSet } = currentPage;
    const canRoute = determineCanRoute(currentPage.routingRuleSet);
    const pagesAfterCurrentDisabled = markFuturePagesAsDisabled(
      questionnaire.sections,
      currentPage
    );

    return (
      <React.Fragment>
        <Title>{get(currentPage, "plaintextTitle") || "Page Title"}</Title>
        <Padding>
          <TransitionGroup>
            {routingRuleSet ? (
              <Transition key="routing-ruleset" exit={false}>
                <div>
                  <RoutingRuleset
                    routingRuleSet={routingRuleSet}
                    routingOptions={availableRoutingDestinations}
                    onAddRule={onAddRoutingRule}
                    onElseChange={this.handleElseChange}
                    canRoute={canRoute}
                  >
                    <TransitionGroup>
                      {routingRuleSet.routingRules.map((rule, index) => (
                        <Transition key={rule.id}>
                          <RoutingRule
                            rule={rule}
                            title={index > 0 ? rule.operation : null}
                            key={rule.id}
                            routingOptions={availableRoutingDestinations}
                            onAddRoutingCondition={this.handleAddCondition}
                            onDeleteRule={this.handleDeleteRule}
                            onThenChange={this.handleThenChange}
                            canRoute={canRoute}
                          >
                            <TransitionGroup>
                              {rule.conditions.map((condition, index) => (
                                <Transition key={condition.id}>
                                  <div>
                                    <RoutingCondition
                                      condition={condition}
                                      label={index > 0 ? "AND" : "IF"}
                                      ruleId={rule.id}
                                      sections={pagesAfterCurrentDisabled}
                                      onRemove={
                                        rule.conditions.length > 1
                                          ? onDeleteRoutingCondition
                                          : null
                                      }
                                      onPageChange={onUpdateRoutingCondition}
                                      onToggleOption={onToggleConditionOption}
                                      match={match}
                                    />
                                  </div>
                                </Transition>
                              ))}
                            </TransitionGroup>
                          </RoutingRule>
                        </Transition>
                      ))}
                    </TransitionGroup>
                  </RoutingRuleset>
                </div>
              </Transition>
            ) : (
              <Transition key="routing-ruleset-empty" exit={false}>
                <div>
                  <RoutingRulesetEmpty
                    title="No routing rules exist for this question"
                    onAddRule={onAddRoutingRuleSet}
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

export default UnconnectedRoutingEditor;
