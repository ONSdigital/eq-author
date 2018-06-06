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
  lowerCase,
  filter
} from "lodash";
import RoutingRuleset from "components/routing/RoutingRuleset";
import RoutingRule from "components/routing/RoutingRule";
import RoutingCondition from "components/routing/RoutingCondition";
import RoutingStatement from "components/routing/RoutingStatement";
import MultipleChoiceAnswerOptionsSelector from "components/routing/MultipleChoiceAnswerOptionsSelector";
import { Alert, AlertTitle, AlertText } from "components/routing/Alert";
import { getLink } from "utils/UrlUtils";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import getSectionAndPageFromSelect from "utils/getSectionAndPageFromSelect";

import RoutingRulesetEmpty from "components/routing/RoutingRulesetEmptyMsg";

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
  const destinations = map(availableRoutingDestinations, destination => ({
    ...destination,
    id: destination.__typename + "_" + destination.id
  }));

  const routingOptions = [
    {
      id: "3",
      title: "Questionnaire Summary",
      pages: [{ title: "Summary", id: "summary" }]
    }
  ];

  const questions = {
    id: "1",
    title: "Questions in this section",
    pages: filter(destinations, dest => dest.__typename === "QuestionPage")
  };

  const sections = {
    id: "2",
    title: "Other sections",
    pages: filter(destinations, dest => dest.__typename === "Section")
  };

  if (sections.pages.length > 0) {
    routingOptions.unshift(sections);
  }

  if (questions.pages.length > 0) {
    routingOptions.unshift(questions);
  }

  return routingOptions;
};

class UnconnectedRoutingEditor extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire.isRequired,
    section: CustomPropTypes.section.isRequired,
    page: CustomPropTypes.page.isRequired,
    sectionId: PropTypes.string.isRequired,
    questionnaireId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    onAddRoutingRuleSet: PropTypes.func.isRequired,
    onAddRoutingCondition: PropTypes.func.isRequired,
    onDeleteRoutingCondition: PropTypes.func.isRequired,
    onAddRoutingRule: PropTypes.func.isRequired,
    onDeleteRoutingRule: PropTypes.func.isRequired,
    onToggleConditionOption: PropTypes.func.isRequired,
    onUpdateRoutingCondition: PropTypes.func.isRequired,
    onUpdateRoutingRule: PropTypes.func.isRequired,
    onUpdateRoutingRuleSet: PropTypes.func.isRequired,
    routingDestinationsLoading: PropTypes.bool,
    loading: PropTypes.bool,
    availableRoutingDestinations: PropTypes.arrayOf(PropTypes.any)
  };

  renderNoAnswerAlert = () => {
    const { questionnaireId, sectionId, pageId } = this.props;
    const link = getLink(questionnaireId, sectionId, pageId);
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
    return includes(["Checkbox", "Radio"], answerType)
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

  handleAddRule = () => {
    const { onAddRoutingRule, routingRuleSet } = this.props;
    onAddRoutingRule(routingRuleSet.id);
  };

  handleElseChange = ({ value }) => {
    const { section, page, onUpdateRoutingRuleSet } = this.props;
    const { sectionId, pageId } = getSectionAndPageFromSelect(
      value,
      section.id
    );

    onUpdateRoutingRuleSet({
      id: page.routingRuleSet.id,
      else: {
        sectionId,
        pageId
      }
    });
  };

  handleDeleteRule = rule => {
    const { onDeleteRoutingRule, routingRuleSet } = this.props;
    onDeleteRoutingRule(routingRuleSet.id, rule.id);
  };

  handleThenChange = (value, rule) => {
    const { section, onUpdateRoutingRule } = this.props;
    const { sectionId, pageId } = getSectionAndPageFromSelect(
      value,
      section.id
    );
    onUpdateRoutingRule({
      id: rule.id,
      goto: {
        sectionId,
        pageId
      }
    });
  };

  renderRoutingConditions = (routingCondition, ruleId) => {
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
        sections={pagesAfterCurrentDisabled}
        selectedPage={routingCondition.questionPage}
        onRemove={function() {
          onDeleteRoutingCondition(ruleId, routingCondition.id);
        }}
        onPageChange={function({ value }) {
          onUpdateRoutingCondition({
            id: routingCondition.id,
            questionPageId: value
          });
        }}
        pathEnd={!canRoute}
      >
        {canRoute
          ? this.renderAnswer(routingCondition, answer)
          : this.renderNoAnswerAlert()}
      </RoutingCondition>
    );
  };

  renderRoutingRule = rule => {
    const {
      page: currentPage,
      onAddRoutingCondition,
      availableRoutingDestinations
    } = this.props;

    const { conditions } = rule;

    const routingOptions = getRoutingOptions(availableRoutingDestinations);

    const canRoute = conditions.every(condition => condition.answer);

    const handleThenChange = this.handleThenChange;

    return (
      <RoutingRule
        key={rule.id}
        gotoValue={get(rule, "goto.id")}
        page={currentPage}
        sections={routingOptions}
        onAddRule={this.handleAddRule}
        onDeleteRule={this.handleDeleteRule}
        onThenChange={function({ value }) {
          handleThenChange(value, rule);
        }}
        canRoute={canRoute}
      >
        <RoutingStatement
          onAddCondition={
            canRoute
              ? function() {
                  onAddRoutingCondition(rule.id);
                }
              : null
          }
        >
          {conditions.map(routingCondition =>
            this.renderRoutingConditions(routingCondition, rule.id)
          )}
        </RoutingStatement>
      </RoutingRule>
    );
  };

  render() {
    const {
      loading,
      page: currentPage,
      routingDestinationsLoading,
      availableRoutingDestinations,
      onAddRoutingRuleSet
    } = this.props;

    if (loading || routingDestinationsLoading) {
      return null;
    }

    const { routingRuleSet } = currentPage;

    const routingOptions = getRoutingOptions(availableRoutingDestinations);

    return (
      <React.Fragment>
        <Title>{get(currentPage, "plaintextTitle", currentPage.title)}</Title>
        <Padding>
          {routingRuleSet && (
            <RoutingRuleset
              sections={routingOptions}
              onAddRule={this.handleAddRule}
              onElseChange={this.handleElseChange}
              canRoute={routingRuleSet.routingRules.every(rule =>
                rule.conditions.every(condition => condition.answer)
              )}
            >
              {routingRuleSet.routingRules.map(this.renderRoutingRule)}
            </RoutingRuleset>
          )}
          {!currentPage.routingRuleSet && (
            <RoutingRulesetEmpty
              title="No routing rules exist for this question"
              onAddRule={onAddRoutingRuleSet}
            />
          )}
        </Padding>
      </React.Fragment>
    );
  }
}

export default UnconnectedRoutingEditor;
