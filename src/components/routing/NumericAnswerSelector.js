/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable dot-notation */

import React, { Fragment } from "react";
import styled from "styled-components";

import { PropTypes } from "prop-types";
import { radius } from "constants/theme";

import {
  flow,
  find,
  first,
  negate,
  overSome,
  isEmpty,
  get,
  every
} from "lodash";

import { withRouter } from "react-router";

import { Input } from "components/Forms";

import { PageSelect } from "./RoutingCondition";
import { withLocalStorageState } from "./withLocalStorageState";

import { CURRENCY, NUMBER } from "constants/answer-types";

import { Tab, Tabs, TabsBody } from "./Tabs";

import NumericOperatorSelect from "./NumericOperatorSelect";
import MetadataSelect from "./MetadataSelect";
import { Alert, AlertTitle, AlertText } from "./Alert";

const NumericAnswer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em 6em 1em 1em;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const hasValidAnswers = sections =>
  !every(sections, section =>
    every(section.options, ({ disabled }) => disabled)
  );

const Comparator = styled.div`
  width: 15em;
`;

const Value = styled.div`
  flex: 1 1 auto;
  margin-left: 1em;
  display: flex;
  align-items: center;
  position: relative;
`;

const NumericInput = styled(Input)`
  width: 10em;
  border-radius: ${radius};
  ${props =>
    props.answerType === CURRENCY &&
    `
    padding-left: 1.2em;
  `};
`;

const CurrencySymbol = styled.div`
  position: absolute;
  opacity: 0.5;
  left: 0.5em;
`;

const getTabContent = ({
  sections,
  onChange,
  state,
  answerType,
  condition
}) => {
  const numericSelectId = `condition-${condition.id}-numeric-select`;
  const customValueId = `condition-${condition.id}-custom-value`;
  const previousAnswerId = `condition-${condition.id}-previous-answer`;
  const metadataId = `condition-${condition.id}-metadata`;

  const customValue = (
    <Flex id="custom">
      <Comparator>
        <NumericOperatorSelect
          onChange={onChange}
          name={numericSelectId}
          id={numericSelectId}
          defaultValue={state[numericSelectId]}
        />
      </Comparator>
      <Value>
        {answerType === CURRENCY && <CurrencySymbol>£ </CurrencySymbol>}
        <NumericInput
          type="number"
          name={customValueId}
          id={customValueId}
          placeholder={"Value"}
          onChange={onChange}
          value={state[customValueId]}
          answerType={answerType}
          max="999999999"
          min="-999999999"
        />
      </Value>
    </Flex>
  );

  const previousAnswer = (
    <Fragment>
      {hasValidAnswers(sections) ? (
        <Flex id="previous-answer">
          <Comparator>
            <NumericOperatorSelect
              onChange={onChange}
              name={numericSelectId}
              id={numericSelectId}
              value={state[numericSelectId]}
            />
          </Comparator>
          <Value>
            <PageSelect
              groups={sections}
              sections={sections}
              onChange={onChange}
              name={previousAnswerId}
              id={previousAnswerId}
              value={state[previousAnswerId]}
              type={answerType}
            />
          </Value>
        </Flex>
      ) : (
        <Alert>
          <AlertTitle>
            There are no previous questions with a {answerType} answer
          </AlertTitle>
          <AlertText>
            Add a {answerType} answer to a previous question to be able to route
            here.
          </AlertText>
        </Alert>
      )}
    </Fragment>
  );

  const metaData = (
    <Flex id="metadata">
      <Comparator>
        <NumericOperatorSelect
          onChange={onChange}
          name={numericSelectId}
          id={numericSelectId}
          value={state[numericSelectId]}
        />
      </Comparator>
      <Value>
        <MetadataSelect
          onChange={onChange}
          name={metadataId}
          id={metadataId}
          value={state[metadataId]}
        />
      </Value>
    </Flex>
  );

  return [
    {
      id: "custom",
      title: "Number",
      component: customValue
    },
    {
      id: "previous-answer",
      title: "Previous answer",
      component: previousAnswer
    },
    {
      id: "metadata",
      title: "Metadata",
      component: metaData
    }
  ];
};

const NumericAnswerSelector = ({
  condition,
  sections,
  state,
  type,
  setState
}) => {
  const isAnswerValidForRouting = answer => get(answer, "type") === type;

  const firstAnswerIsValid = flow(
    first,
    isAnswerValidForRouting
  );
  const shouldDisable = overSome([isEmpty, negate(firstAnswerIsValid)]);

  const convertToGroups = (sections, condition) =>
    sections.map(section => ({
      label: section.plaintextTitle || "Section Title",
      id: section.id,
      options: section.pages.map(page => ({
        label: page.plaintextTitle || "Page Title",
        value: page.id,
        disabled:
          shouldDisable(page.answers) || page.id === condition.questionPage.id
      }))
    }));

  const tabsId = `${type}_${condition.id}`;

  const activeTabId = state[tabsId] || "custom";

  const handleChange = ({ name, value }) => setState({ [name]: value });

  const tabItems = getTabContent({
    condition: condition,
    sections: convertToGroups(sections, condition),
    state,
    onChange: handleChange,
    answerType: type
  });

  const activeItem = find(tabItems, { id: activeTabId });

  return (
    <NumericAnswer data-test="options-selector">
      <Tabs>
        {tabItems.map(item => (
          <Tab
            role="tab"
            aria-selected={item.id === activeTabId}
            key={item.id}
            controls={item.id}
            onClick={() => setState({ [tabsId]: item.id })}
          >
            {item.title}
          </Tab>
        ))}
      </Tabs>
      <TabsBody navItemId={activeItem.id}>{activeItem.component}</TabsBody>
    </NumericAnswer>
  );
};

NumericAnswerSelector.propTypes = {
  condition: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  type: PropTypes.oneOf([CURRENCY, NUMBER]).isRequired,
  setState: PropTypes.func.isRequired
};

export default flow(
  withRouter,
  withLocalStorageState
)(NumericAnswerSelector);
