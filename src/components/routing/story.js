/* eslint-disable  jsx-a11y/href-no-hash */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";

import routingOptions from "./mockstate";

import RoutingCondition from "./RoutingCondition";
import RoutingRule from "./RoutingRule";
import RoutingRuleset from "./RoutingRuleSet";
import MultipleChoiceAnswerOptionsSelector from "./MultipleChoiceAnswerOptionsSelector";
import { Alert, AlertText, AlertTitle } from "./Alert";

const selectedPage = routingOptions[0].pages[0];

const Background = styled.span`
  padding: 1em;
  display: block;
  max-width: 55em;
`;

const ruleSetProps = {
  onAddRule: action("Add rule"),
  onElseChange: action("Else changed"),
  routingOptions
};

const ruleProps = {
  page: selectedPage,
  routingOptions,
  onAddRule: action("Add rule"),
  onDeleteRule: action("Delete rule"),
  onThenChange: action("Then changed")
};

const conditionProps = {
  routingOptions,
  selectedPage: selectedPage,
  onPageChange: action("Page changed")
};

const multiChoiceAnswerProps = {
  options: selectedPage.options,
  onOptionSelectionChange: action("option selected")
};

storiesOf("Routing", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("With single RoutingCondition", () => (
    <RoutingRuleset {...ruleSetProps}>
      <RoutingRule {...ruleProps}>
        <RoutingCondition id="routing-condition" {...conditionProps}>
          <MultipleChoiceAnswerOptionsSelector {...multiChoiceAnswerProps} />
        </RoutingCondition>
      </RoutingRule>
    </RoutingRuleset>
  ))
  .add("With multiple RoutingCondition", () => (
    <RoutingRuleset {...ruleSetProps}>
      <RoutingRule {...ruleProps}>
        <RoutingCondition id="routing-condition-0" {...conditionProps}>
          <MultipleChoiceAnswerOptionsSelector {...multiChoiceAnswerProps} />
        </RoutingCondition>
        <RoutingCondition
          id="routing-condition-1"
          label="AND"
          {...conditionProps}
        >
          <MultipleChoiceAnswerOptionsSelector
            {...multiChoiceAnswerProps}
            options={routingOptions[0].pages[1].options}
          />
        </RoutingCondition>
      </RoutingRule>
    </RoutingRuleset>
  ))
  .add("With 'no answers' error", () => (
    <RoutingRuleset {...ruleSetProps} canRoute={false}>
      <RoutingRule {...ruleProps} canRoute={false}>
        <RoutingCondition id="routing-condition" {...conditionProps} pathEnd>
          <Alert>
            <AlertTitle>
              No answers have been added to this question yet.
            </AlertTitle>
            <AlertText>
              First, <a href="#">add an answer</a> to continue.
            </AlertText>
          </Alert>
        </RoutingCondition>
      </RoutingRule>
    </RoutingRuleset>
  ))
  .add("With 'unsupported answer type' error", () => (
    <RoutingRuleset {...ruleSetProps} canRoute={false}>
      <RoutingRule {...ruleProps} canRoute={false}>
        <RoutingCondition id="routing-condition" {...conditionProps} pathEnd>
          <Alert>
            <AlertTitle>
              Routing is not available for this type of answer
            </AlertTitle>
            <AlertText>
              You cannot route on &apos;date range&apos; answers
            </AlertText>
          </Alert>
        </RoutingCondition>
      </RoutingRule>
    </RoutingRuleset>
  ))
  .add("Multiple Rules", () => (
    <React.Fragment>
      <RoutingRuleset {...ruleSetProps}>
        <RoutingRule {...ruleProps}>
          <RoutingCondition id="routing-condition-0" {...conditionProps}>
            <MultipleChoiceAnswerOptionsSelector {...multiChoiceAnswerProps} />
          </RoutingCondition>
        </RoutingRule>

        <RoutingRule {...ruleProps} title="OR">
          <RoutingCondition id="routing-condition-1" {...conditionProps}>
            <MultipleChoiceAnswerOptionsSelector {...multiChoiceAnswerProps} />
          </RoutingCondition>
        </RoutingRule>
      </RoutingRuleset>
    </React.Fragment>
  ))
  .add("Empty Rule", () => <RoutingRule {...ruleProps} />);
