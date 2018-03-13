/* eslint-disable react/prop-types, jsx-a11y/href-no-hash */

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { first } from "lodash";

import RoutingCondition from "components/RoutingCondition";
import MultipleChoiceAnswerOptionsSelector from "./MultipleChoiceAnswerOptionsSelector";
import { Alert, AlertText, AlertTitle } from "./Alert";

import sections from "./mockstate";

const Background = styled.span`
  padding: 1em;
  display: block;
  max-width: 55em;
`;

const selectedPage = first(first(sections).pages);

storiesOf("RoutingCondition", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Default", () => (
    <RoutingCondition
      id="routing-condition"
      selectedPage={selectedPage}
      onPageChange={action("Page selected")}
      onRemoveClick={action("Close")}
      sections={sections}
    >
      <MultipleChoiceAnswerOptionsSelector
        options={selectedPage.options}
        onOptionSelectionChange={action("Option selected")}
        onSelectAll={action("Select all")}
      />
    </RoutingCondition>
  ))
  .add("No answers", () => (
    <RoutingCondition
      id="routing-condition"
      selectedPage={selectedPage}
      onPageChange={action("Page selected")}
      onRemoveClick={action("Close")}
      sections={sections}
      pathEnd
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
  ))
  .add("Routing unsupported", () => (
    <RoutingCondition
      id="routing-condition"
      selectedPage={selectedPage}
      onPageChange={action("Page selected")}
      onRemoveClick={action("Close")}
      sections={sections}
      pathEnd
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
  ));
