/* eslint-disable  jsx-a11y/href-no-hash */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";

import sections from "./mockstate";

import RoutingCondition from "./RoutingCondition";
import RoutingStatement from "./RoutingStatement";

import MultipleChoiceAnswerOptionsSelector from "./MultipleChoiceAnswerOptionsSelector";
import { Alert, AlertText, AlertTitle } from "./Alert";

const Background = styled.span`
  padding: 1em;
  display: block;
  max-width: 55em;
`;

const selectedPage = sections[0].pages[0];

storiesOf("Routing", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("RoutingStatement w/ single RoutingCondition", () => (
    <RoutingStatement
      id="routing-statement"
      onAddCondition={action("Add condition")}
    >
      <RoutingCondition
        id="routing-condition"
        sections={sections}
        selectedPage={selectedPage}
        onPageChange={action("Page changed")}
        onRemoveClick={action("remove")}
      >
        <MultipleChoiceAnswerOptionsSelector
          options={selectedPage.options}
          onOptionSelectionChange={action("option selected")}
          onSelectAll={action("selected all")}
        />
      </RoutingCondition>
    </RoutingStatement>
  ))
  .add("RoutingStatement w/ multiple RoutingCondition", () => (
    <RoutingStatement
      id="routing-statement"
      onAddCondition={action("Add condition")}
    >
      <RoutingCondition
        id="routing-condition-0"
        sections={sections}
        selectedPage={selectedPage}
        onPageChange={action("Page changed")}
        onRemoveClick={action("remove")}
      >
        <MultipleChoiceAnswerOptionsSelector
          options={selectedPage.options}
          onOptionSelectionChange={action("option selected")}
          onSelectAll={action("selected all")}
        />
      </RoutingCondition>
      <RoutingCondition
        id="routing-condition-1"
        sections={sections}
        selectedPage={selectedPage}
        onPageChange={action("Page changed")}
        onRemoveClick={action("remove")}
      >
        <MultipleChoiceAnswerOptionsSelector
          options={sections[0].pages[1].options}
          onOptionSelectionChange={action("Option selected")}
          onSelectAll={action("selected all")}
        />
      </RoutingCondition>
    </RoutingStatement>
  ))
  .add("RoutingStatement with 'no answers' error", () => (
    <RoutingStatement
      id="routing-statement"
      onAddCondition={action("Add condition")}
    >
      <RoutingCondition
        id="routing-condition"
        sections={sections}
        selectedPage={selectedPage}
        onPageChange={action("Page changed")}
        onRemoveClick={action("remove")}
      >
        <Alert>
          <AlertTitle>
            No answers have been added to this question yet.
          </AlertTitle>
          <AlertText>
            First, <a href="#">add an answer</a> to continue.
          </AlertText>
        </Alert>
      </RoutingCondition>
    </RoutingStatement>
  ))
  .add("RoutingStatement with 'unsupported answer type' error", () => (
    <RoutingStatement
      id="routing-statement"
      onAddCondition={action("Add condition")}
    >
      <RoutingCondition
        id="routing-condition"
        sections={sections}
        selectedPage={selectedPage}
        onPageChange={action("Page changed")}
        onRemoveClick={action("remove")}
      >
        <Alert>
          <AlertTitle>
            Routing is not available for this type of answer
          </AlertTitle>
          <AlertText>
            You cannot route on &apos;date range&apos; answers
          </AlertText>
        </Alert>
      </RoutingCondition>
    </RoutingStatement>
  ));
