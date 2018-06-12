import React from "react";
import styled from "styled-components";
import { colors } from "constants/theme";
import {
  isNil,
  get,
  includes,
  map,
  find,
  flatMap,
  dropRightWhile,
  replace,
  lowerCase
} from "lodash";
import RoutingRuleset from "components/routing/RoutingRuleset";
import RoutingRule from "components/routing/RoutingRule";
import RoutingCondition from "components/routing/RoutingCondition";
import RoutingStatement from "components/routing/RoutingStatement";
import MultipleChoiceAnswerOptionsSelector from "components/routing/MultipleChoiceAnswerOptionsSelector";
import { Alert, AlertTitle, AlertText } from "components/routing/Alert";
import { buildPagePath } from "utils/UrlUtils";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import getSectionAndPageFromSelect from "utils/getSectionAndPageFromSelect";

import RoutingRulesetEmpty from "components/routing/RoutingRulesetEmptyMsg";
import getIdForObject from "utils/getIdForObject";
import getDestinationId from "utils/getDestinationId";
import { RADIO, CHECKBOX } from "constants/answer-types";

import Transition from "components/routing/Transition";
import { TransitionGroup } from "react-transition-group";

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

const getRoutingOptions = availableRoutingDestinations => {
  const {
    logicalDestinations,
    questionPages,
    sections
  } = availableRoutingDestinations;

  const prefixIdsWithTypeName = destinations =>
    map(destinations, destination => ({
      ...destination,
      id: getIdForObject(destination)
    }));

  const questionPageDestinations = {
    id: "questionPages",
    title: "Questions in this section",
    pages: prefixIdsWithTypeName(questionPages)
  };

  const sectionDestinations = {
    id: "sections",
    title: "Other sections",
    pages: prefixIdsWithTypeName(sections)
  };

  const summary = {
    id: logicalDestinations[1].logicalDestination,
    title: "Questionnaire summary",
    pages: [{ title: "Summary", id: logicalDestinations[1].logicalDestination }]
  };

  const routingOptions = [summary];

  if (sections.length > 0) {
    routingOptions.unshift(sectionDestinations);
  }

  if (questionPages.length > 0) {
    routingOptions.unshift(questionPageDestinations);
  }

  return routingOptions;
};

const getDestinationFromSelect = value => {
  const isAbsoluteDestination =
    /^QuestionPage/.test(value) || /^Section/.test(value);
  let input;
  if (isAbsoluteDestination) {
    const destinationType = /^QuestionPage/.test(value)
      ? "QuestionPage"
      : "Section";
    input = {
      absoluteDestination: {
        destinationType,
        destinationId: replace(value, destinationType, "")
      }
    };
  } else {
    input = {
      logicalDestination: {
        destinationType: value
      }
    };
  }
  return input;
};

class UnconnectedRoutingEditor extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire.isRequired,
    section: CustomPropTypes.section.isRequired,
    page: CustomPropTypes.page.isRequired,
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
    routingDestinationsLoading: PropTypes.bool,
    loading: PropTypes.bool,
    availableRoutingDestinations: PropTypes.shape({
      logicalDestinations: PropTypes.arrayOf(PropTypes.any),
      questionPages: PropTypes.arrayOf(CustomPropTypes.page),
      sections: PropTypes.arrayOf(CustomPropTypes.section)
    })
  };

  renderNoAnswerAlert = () => {
    const link = buildPagePath(this.props.match.params);
    return (
      <Alert>
        <AlertTitle>
          No answers have been added to this question yet.
        </AlertTitle>
        <AlertText>
          First, <NavLink to={link}>add an answer</NavLink> to continue.
        </AlertText>
      </Alert>
    );
  };

  renderUnsupportedAnswerAlert = answerType => (
    <Alert>
      <AlertTitle>Routing is not available for this type of answer</AlertTitle>
      <AlertText>
        You cannot route on &apos;{lowerCase(answerType)}&apos; answers
      </AlertText>
    </Alert>
  );

  renderAnswer = (routingCondition, answer) => {
    const answerType = get(answer, "type");
    return includes([RADIO, CHECKBOX], answerType)
      ? this.renderOptions(routingCondition, answer)
      : this.renderUnsupportedAnswerAlert(answerType);
  };

  renderOptions = (routingCondition, answer) => {
    const selectedOptions = get(routingCondition, "routingValue.value", []);

    const options = get(routingCondition, "answer.options", []).map(opt => ({
      ...opt,
      id: `${routingCondition.id}_${opt.id}`,
      selected: includes(selectedOptions, opt.id)
    }));

    const { onToggleConditionOption } = this.props;

    return (
      <MultipleChoiceAnswerOptionsSelector
        options={options}
        onOptionSelectionChange={function({ name, value: checked }) {
          const optionId = replace(
            name,
            new RegExp(`^${routingCondition.id}_`),
            ""
          );
          onToggleConditionOption(routingCondition.id, optionId, checked);
        }}
      />
    );
  };

  handleElseChange = ({ value }) => {
    const { page, onUpdateRoutingRuleSet } = this.props;
    const input = getDestinationFromSelect(value);

    onUpdateRoutingRuleSet({
      id: page.routingRuleSet.id,
      else: input
    });
  };

  handleThenChange = (value, rule) => {
    const { onUpdateRoutingRule } = this.props;
    onUpdateRoutingRule({
      id: rule.id,
      goto: getDestinationFromSelect(value)
    });
  };

  renderRoutingConditions = (routingCondition, ruleId, canRemove) => {
    const {
      questionnaire,
      page: currentPage,
      onDeleteRoutingCondition,
      onUpdateRoutingCondition
    } = this.props;

    const allPages = flatMap(questionnaire.sections, section => section.pages);

    const pagesBeforeCurrentPage = dropRightWhile(
      allPages,
      p => p.id !== currentPage.id
    );

    const pagesAfterCurrentDisabled = map(questionnaire.sections, section => ({
      ...section,
      pages: map(section.pages, page => ({
        ...page,
        disabled: isNil(
          find(pagesBeforeCurrentPage, {
            id: page.id
          })
        )
      }))
    }));

    const answer = get(routingCondition, "answer");
    const canRoute = !isNil(answer);

    return (
      <RoutingCondition
        key={routingCondition.id}
        id="routing-condition"
        ruleId={ruleId}
        sections={pagesAfterCurrentDisabled}
        selectedPage={routingCondition.questionPage}
        routingCondition={routingCondition}
        onRemove={onDeleteRoutingCondition}
        onPageChange={onUpdateRoutingCondition}
        pathEnd={!canRoute}
        canRemove={canRemove}
      >
        <TransitionGroup>
          {canRoute ? (
            <Transition key="answer" exit={false}>
              <div>{this.renderAnswer(routingCondition, answer)}</div>
            </Transition>
          ) : (
            <Transition key="no-answer-alert" exit={false}>
              <div>{this.renderNoAnswerAlert()}</div>
            </Transition>
          )}{" "}
        </TransitionGroup>
      </RoutingCondition>
    );
  };

  render() {
    const {
      loading,
      page: currentPage,
      routingDestinationsLoading,
      availableRoutingDestinations,
      onAddRoutingRuleSet,
      onAddRoutingRule,
      onDeleteRoutingRule,
      onDeleteRoutingRuleSet,
      onAddRoutingCondition
    } = this.props;

    if (loading || routingDestinationsLoading) {
      return null;
    }

    const { routingRuleSet } = currentPage;
    const routingOptions = getRoutingOptions(availableRoutingDestinations);

    const canRoute =
      routingRuleSet &&
      routingRuleSet.routingRules.every(rule =>
        rule.conditions.every(condition => {
          return (
            condition.answer &&
            (condition.answer.type === RADIO ||
              condition.answer.type === CHECKBOX)
          );
        })
      );

    return (
      <React.Fragment>
        <Title>{get(currentPage, "plaintextTitle", currentPage.title)}</Title>
        <Padding>
          <TransitionGroup>
            {routingRuleSet ? (
              <Transition key="routing-ruleset" exit={false}>
                <div>
                  <RoutingRuleset
                    routingRuleSet={routingRuleSet}
                    routingOptions={routingOptions}
                    onAddRule={onAddRoutingRule}
                    onElseChange={this.handleElseChange}
                    elseValue={getDestinationId(routingRuleSet.else)}
                    canRoute={canRoute}
                  >
                    <TransitionGroup>
                      {routingRuleSet.routingRules.map(rule => (
                        <Transition key={rule.id}>
                          <RoutingRule
                            rule={rule}
                            routingRuleSetId={routingRuleSet.id}
                            key={rule.id}
                            page={currentPage}
                            routingOptions={routingOptions}
                            onAddRule={onAddRoutingRule}
                            onDeleteRule={function() {
                              routingRuleSet.routingRules.length > 1
                                ? onDeleteRoutingRule(
                                    routingRuleSet.id,
                                    rule.id
                                  )
                                : onDeleteRoutingRuleSet(
                                    routingRuleSet.id,
                                    currentPage.id
                                  );
                            }}
                            onThenChange={this.handleThenChange}
                            canRoute={canRoute}
                          >
                            <RoutingStatement
                              onAddCondition={onAddRoutingCondition}
                              routingRuleId={rule.id}
                              canRoute={canRoute}
                            >
                              <TransitionGroup>
                                {rule.conditions.map(routingCondition => (
                                  <Transition key={routingCondition.id}>
                                    <div>
                                      {this.renderRoutingConditions(
                                        routingCondition,
                                        rule.id,
                                        rule.conditions.length > 1
                                      )}
                                    </div>
                                  </Transition>
                                ))}
                              </TransitionGroup>
                            </RoutingStatement>
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
