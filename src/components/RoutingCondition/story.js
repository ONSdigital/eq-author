/* eslint-disable react/prop-types, jsx-a11y/href-no-hash */

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { find, each } from "lodash";

import RoutingCondition from "components/RoutingCondition";
import MultipleChoiceAnswerOptionsSelector from "./MultipleChoiceAnswerOptionsSelector";
import { Alert, AlertText, AlertTitle } from "./Alert";

import sections from "./mockstate";

const Background = styled.span`
  padding: 1em;
  display: block;
  max-width: 55em;
`;

const findPageById = id => {
  let page;

  each(sections, ({ pages }) => {
    let result = find(pages, { id });
    if (result) {
      page = result;
    }
  });

  return page;
};

class ControlledRoutingCondition extends React.Component {
  state = {
    selectedPage: sections[0].pages[0]
  };

  handlePageChange = e => {
    this.setState({ selectedPage: findPageById(e.value) });
  };

  handleOptionSelectionChange = ({ name, value }) => {
    const { selectedPage } = this.state;

    find(selectedPage.options, { id: name }).selected = value;

    this.setState({
      selectedPage: {
        ...selectedPage
      }
    });
  };

  handleSelectAll = e => {
    const { selectedPage } = this.state;

    this.setState({
      selectedPage: {
        ...selectedPage,
        options: selectedPage.options.map(opt => ({
          ...opt,
          selected: true
        }))
      }
    });
  };

  render() {
    return (
      <RoutingCondition
        selectedPage={this.state.selectedPage}
        onPageChange={this.handlePageChange}
        onRemoveClick={action("Close")}
        sections={sections}
        {...this.props}
      >
        {this.props.children({
          options: this.state.selectedPage.options,
          onOptionSelectionChange: this.handleOptionSelectionChange,
          onSelectAll: this.handleSelectAll
        })}
      </RoutingCondition>
    );
  }
}

storiesOf("RoutingCondition", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Default", () => (
    <ControlledRoutingCondition id="routing-condition">
      {({ options, onOptionSelectionChange, onSelectAll }) => (
        <MultipleChoiceAnswerOptionsSelector
          options={options}
          onOptionSelectionChange={onOptionSelectionChange}
          onSelectAll={onSelectAll}
        />
      )}
    </ControlledRoutingCondition>
  ))
  .add("No answers", () => (
    <ControlledRoutingCondition id="routing-condition" pathEnd>
      {() => (
        <Alert>
          <AlertTitle>
            No answers have been added to this question yet.
          </AlertTitle>
          <AlertText>
            First, <a href="#">add an answer</a> to continue.
          </AlertText>
        </Alert>
      )}
    </ControlledRoutingCondition>
  ))
  .add("Routing unsupported", () => (
    <ControlledRoutingCondition id="routing-condition" pathEnd>
      {() => (
        <Alert>
          <AlertTitle>
            Routing is not available for this type of answer
          </AlertTitle>
          <AlertText>
            You cannot route on &apos;date range&apos; answers
          </AlertText>
        </Alert>
      )}
    </ControlledRoutingCondition>
  ));
