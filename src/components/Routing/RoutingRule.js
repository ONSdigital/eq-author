import React from "react";
import Select from "./Select";
import TextBtn from "./TextBtn";
import Panel from "./Panel";

import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { find, first, map, get } from "lodash";

import getRoutingOptions from "./routingOptions";
import RoutingCondition from "./RoutingCondition";

const duration = 0;

const Rule = styled.div`
  padding: 0;
  margin-bottom: 1em;

  &.transition-enter,
  &.transition-exit.transition-exit-active {
    opacity: 0;
    transform: translateY(20px);
  }

  &.transition-exit,
  &.transition-enter.transition-enter-active {
    opacity: 1;
    transform: translateY(0);
  }

  &.transition-enter-active {
    transition: height ${duration / 2}ms ease-out,
      opacity ${duration / 2}ms ease-out ${duration / 2}ms,
      transform ${duration / 2}ms ease-out ${duration / 2}ms;
  }

  &.transition-exit-active {
    transition: opacity ${duration / 2}ms ease-out,
      transform ${duration / 2}ms ease-out;
  }
`;

const Title = styled.h1`
  font-size: 1.3em;
  margin: 0;
  padding: 0 0.5em;
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
`;

const Label = styled.label`
  font-size: 0.9em;
  font-weight: 600;
  margin-right: 0.5em;
  width: 3em;
`;

const GotoField = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const GotoLabel = styled(Label)`
  width: 3em;
  font-weight: 500;
`;

const GotoSelect = styled(Select)`
  width: 25em;
  padding-right: 2em;
`;

const Transition = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={duration} classNames="transition">
    {children}
  </CSSTransition>
);

const RemoveBtn = styled(TextBtn)`
  margin-left: auto;
  font-size: 0.8em;
  flex: 0 0 auto;
`;

class RoutingRule extends React.Component {
  handleAddBtnClick = e => {
    e.preventDefault();
    const { rule, question, addAndCondition } = this.props;
    addAndCondition(rule.id, question.id);
  };

  handleOrBtnClick = e => {
    e.preventDefault();
    const { rule, question, addOrCondition } = this.props;
    addOrCondition(rule.id, question.id);
  };

  handleRemoveBtnClick = id => {
    this.props.removeCondition(id);
  };

  handleRemoveRule = e => {
    this.props.removeRule(this.props.rule.id);
  };

  render() {
    const {
      section,
      question,
      questionnaire,
      title,
      selectOptions,
      selectOption,
      deselectOption,
      addOption,
      removeOption,
      selectQuestion,
      selectRuleGoto,
      selectConditionComparator,
      removeRule,
      firstChild,
      rule
    } = this.props;

    const routeOpts = getRoutingOptions(section, question, questionnaire);

    return (
      <Rule>
        {firstChild ? (
          <Panel>
            <Flex>
              <Title>{title}</Title>
              <RemoveBtn onClick={this.handleRemoveRule}>REMOVE RULE</RemoveBtn>
            </Flex>
          </Panel>
        ) : (
          <Panel foo>
            <Flex>
              <Label>OR</Label>
              <RemoveBtn onClick={this.handleRemoveRule}>REMOVE RULE</RemoveBtn>
            </Flex>
          </Panel>
        )}
        <Panel style={{ paddingBottom: "0" }}>
          <TransitionGroup>
            {map(
              rule.conditions,
              (
                {
                  id: conditionId,
                  selectedQuestionId,
                  selectedAnswerId,
                  selectedOptions,
                  comparator,
                  type
                },
                index
              ) => {
                const [questionId, answerId] = selectedQuestionId.split("-");

                const selectedSection = find(questionnaire.sections, {
                  pages: [{ id: questionId }]
                });

                const selectedQuestion = find(selectedSection.pages, {
                  id: questionId
                });

                const answer =
                  find(selectedQuestion.answers, { id: answerId }) ||
                  selectedQuestion.answers[0];

                const conditionType = get(first(rule.conditions), "type");

                return (
                  <Transition key={index}>
                    <RoutingCondition
                      question={question}
                      answer={answer}
                      id={conditionId}
                      comparator={comparator}
                      type={type}
                      conditionType={conditionType}
                      conditionId={conditionId}
                      onRemoveBtnClick={this.handleRemoveBtnClick}
                      selectOptions={selectOptions}
                      selectOption={selectOption}
                      deselectOption={deselectOption}
                      addOption={addOption}
                      removeOption={removeOption}
                      onQuestionSelect={selectQuestion}
                      onRemoveRule={removeRule}
                      onAddBtnClick={this.handleAddBtnClick}
                      onOrBtnClick={this.handleOrBtnClick}
                      selectConditionComparator={selectConditionComparator}
                      questionnaire={questionnaire}
                      selectedQuestionId={selectedQuestionId}
                      selectedAnswerId={selectedAnswerId}
                      selectedOptions={selectedOptions}
                      firstChild={index === 0}
                      onlyChild={rule.conditions.length > 1}
                      lastChild={index === rule.conditions.length - 1}
                    />
                  </Transition>
                );
              }
            )}
          </TransitionGroup>
        </Panel>

        <Panel foo>
          <Flex>
            <Label>THEN</Label>
            <GotoField>
              <GotoLabel htmlFor={`then-${rule.id}`}>Go to</GotoLabel>
              <GotoSelect
                defaultValue={rule.goto}
                onChange={function(e) {
                  selectRuleGoto(rule.id, e.value);
                }}
                optionGroup={routeOpts}
                id={`then-${rule.id}`}
              />
            </GotoField>
          </Flex>
        </Panel>
      </Rule>
    );
  }
}

export default RoutingRule;
