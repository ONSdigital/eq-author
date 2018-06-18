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

import MultipleChoiceAnswerOptionsSelector from "components/routing/MultipleChoiceAnswerOptionsSelector";
import { Alert, AlertTitle, AlertText } from "components/routing/Alert";
import { buildPagePath } from "utils/UrlUtils";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import TextButton from "components/TextButton";
import { Grid, Column } from "components/Grid";

import RoutingRulesetEmpty from "components/routing/RoutingRulesetEmptyMsg";

import { RADIO, CHECKBOX } from "constants/answer-types";

import Transition from "components/routing/Transition";
import { TransitionGroup } from "react-transition-group";
import Loading from "components/Loading";

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

const CenteringColumn = styled(Column)`
  display: flex;
  justify-content: center;
  padding: 0.25em 0;
  margin-bottom: 0.5em;
`;

class UnconnectedRoutingEditor extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire.isRequired,
    section: CustomPropTypes.section.isRequired,
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

  handleElseChange = value => {
    this.props.onUpdateRoutingRuleSet(value);
  };

  handleThenChange = value => {
    this.props.onUpdateRoutingRule(value);
  };

  renderRoutingConditions = ({
    routingCondition,
    ruleId,
    canRemove,
    index
  }) => {
    const {
      questionnaire,
      currentPage,
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
        label={index > 0 ? "AND" : "IF"}
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
          )}
        </TransitionGroup>
      </RoutingCondition>
    );
  };

  render() {
    const {
      loading,
      currentPage,
      availableRoutingDestinations,
      onAddRoutingRuleSet,
      onAddRoutingRule,
      onDeleteRoutingRule,
      onDeleteRoutingRuleSet,
      onAddRoutingCondition
    } = this.props;

    if (loading || !currentPage) {
      return <Loading height="38rem">Loading…</Loading>;
    }

    const { routingRuleSet } = currentPage;

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
                            title={index > 0 ? "OR" : null}
                            routingRuleSetId={routingRuleSet.id}
                            key={rule.id}
                            page={currentPage}
                            routingOptions={availableRoutingDestinations}
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
                            <TransitionGroup>
                              {rule.conditions.map(
                                (routingCondition, index) => (
                                  <Transition key={routingCondition.id}>
                                    <div>
                                      {this.renderRoutingConditions({
                                        routingCondition,
                                        ruleId: rule.id,
                                        canRemove: rule.conditions.length > 1,
                                        index
                                      })}
                                    </div>
                                  </Transition>
                                )
                              )}
                            </TransitionGroup>

                            {canRoute && (
                              <Grid align="center">
                                <CenteringColumn gutters={false} cols={1}>
                                  <TextButton
                                    onClick={function() {
                                      onAddRoutingCondition(rule.id);
                                    }}
                                    data-test="btn-add"
                                  >
                                    AND
                                  </TextButton>
                                </CenteringColumn>
                              </Grid>
                            )}
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
