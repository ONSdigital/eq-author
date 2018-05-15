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
  filter,
  replace,
  lowerCase,
  noop
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

const Title = styled.h2`
  padding: 0.5em 1em;
  color: #666;
  font-size: 1.4em;
  border-bottom: 1px solid ${colors.lightGrey};
  margin: 0;
`;

const Padding = styled.div`
  padding: 1em;
`;

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

  render() {
    const {
      loading,
      questionnaire,
      section,
      page: currentPage,
      routingDestinationsLoading,
      availableRoutingDestinations,
      onAddRoutingRuleSet,
      onAddRoutingCondition,
      onDeleteRoutingCondition,
      onAddRoutingRule,
      onDeleteRoutingRule,
      onUpdateRoutingCondition,
      onUpdateRoutingRule,
      onUpdateRoutingRuleSet
    } = this.props;

    if (loading || routingDestinationsLoading) {
      return null;
    }

    const { routingRuleSet } = currentPage;

    const destinations = map(availableRoutingDestinations, destination => ({
      ...destination,
      id: destination.__typename + "_" + destination.id
    }));

    const questionsInCurrentSectionAndFutureSections = [
      {
        id: "1",
        title: "Questions in this section",
        pages: filter(destinations, dest => dest.__typename === "QuestionPage")
      },
      {
        id: "2",
        title: "Other sections",
        pages: filter(destinations, dest => dest.__typename === "Section")
      }
    ];

    return (
      <React.Fragment>
        <Title>{get(currentPage, "plaintextTitle", currentPage.title)}</Title>
        <Padding>
          {routingRuleSet && (
            <RoutingRuleset
              sections={questionsInCurrentSectionAndFutureSections}
              onAddRule={function() {
                onAddRoutingRule(routingRuleSet.id);
              }}
              onElseChange={function({ value }) {
                const { sectionId, pageId } = getSectionAndPageFromSelect(
                  value,
                  section.id
                );
                onUpdateRoutingRuleSet({
                  id: routingRuleSet.id,
                  else: {
                    sectionId,
                    pageId
                  }
                });
              }}
            >
              {routingRuleSet.routingRules.map(rule => {
                const { conditions } = rule;

                return (
                  <RoutingRule
                    key={rule.id}
                    page={currentPage}
                    sections={questionsInCurrentSectionAndFutureSections}
                    onAddRule={function() {
                      onAddRoutingRule(routingRuleSet.id);
                    }}
                    onDeleteRule={function() {
                      onDeleteRoutingRule(routingRuleSet.id, rule.id);
                    }}
                    onThenChange={function({ value }) {
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
                    }}
                  >
                    <RoutingStatement
                      onAddCondition={function() {
                        onAddRoutingCondition(rule.id);
                      }}
                    >
                      {conditions.map(routingCondition => {
                        const allPages = flatMap(
                          questionnaire.sections,
                          section => {
                            return section.pages;
                          }
                        );
                        const pagesBeforeCurrentPage = dropRightWhile(
                          allPages,
                          p => p.id !== currentPage.id
                        );
                        const pagesAfterCurrentDisabled = map(
                          questionnaire.sections,
                          section => {
                            return {
                              ...section,
                              pages: map(section.pages, page => {
                                return {
                                  ...page,
                                  disabled: isNil(
                                    find(pagesBeforeCurrentPage, {
                                      id: page.id
                                    })
                                  )
                                };
                              })
                            };
                          }
                        );

                        const answer = get(routingCondition, "answer");

                        return (
                          <RoutingCondition
                            key={routingCondition.id}
                            id="routing-condition"
                            sections={pagesAfterCurrentDisabled}
                            selectedPage={routingCondition.questionPage}
                            onRemove={function() {
                              onDeleteRoutingCondition(
                                rule.id,
                                routingCondition.id
                              );
                            }}
                            onPageChange={function({ value }) {
                              onUpdateRoutingCondition({
                                id: routingCondition.id,
                                questionPageId: value
                              });
                            }}
                          >
                            {!isNil(answer) &&
                              this.renderAnswer(routingCondition, answer)}
                            {isNil(answer) && this.renderNoAnswerAlert()}
                          </RoutingCondition>
                        );
                      })}
                    </RoutingStatement>
                  </RoutingRule>
                );
              })}
            </RoutingRuleset>
          )}
          {!currentPage.routingRuleSet && (
            <RoutingRule
              page={currentPage}
              sections={questionsInCurrentSectionAndFutureSections}
              title={get(currentPage, "plaintextTitle", currentPage.title)}
              onAddRule={onAddRoutingRuleSet}
              onDeleteRule={noop}
              onThenChange={noop}
            />
          )}
        </Padding>
      </React.Fragment>
    );
  }
}

export default UnconnectedRoutingEditor;
