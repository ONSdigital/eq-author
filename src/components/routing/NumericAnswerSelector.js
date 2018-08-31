/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable dot-notation */

import React from "react";
import styled from "styled-components";

import { PropTypes } from "prop-types";
import { colors } from "constants/theme";

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

import { TabsBody } from "components/ModalWithNav/Tabs";

import { Select, Input } from "components/Forms";

import { PageSelect } from "./RoutingCondition";
import { withLocalStorageState } from "./withLocalStorageState";
import Icon from "./icon-alert.svg?inline";
import { CURRENCY } from "constants/answer-types";

const NumericAnswer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0;
  margin: 0.25em 0;
`;

const PillTabs = styled.div`
  background-color: #e4e8eb;
  border-radius: 3em;
  display: flex;
  margin: 0.25em 0 1em;
`;

const PillTab = styled.div`
  padding: 0.5em 2em;
  border-radius: 3em;
  color: ${colors.darkGrey};
  cursor: pointer;
  flex: 1 1 auto;
  text-align: center;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &[aria-selected="true"] {
    background: ${colors.primary};
    color: white;
  }

  &:first-child {
    margin-right: 0.5em;
  }

  &:last-child {
    margin-left: 0.5em;
  }
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const NotAvailableMsg = styled.div`
  padding: 0.5em;
`;

const NotAvailable = ({ type }) => (
  <Flex>
    <Icon width="1.4em" />
    <NotAvailableMsg>
      Sorry, no previous answers are of type{" "}
      <strong>{type.toLowerCase()}</strong>
    </NotAvailableMsg>
  </Flex>
);

const NumericSelect = props => (
  <Select {...props}>
    <option value="equal">{"(=) Equal to"}</option>
    <option value="not-equal">{"(≠) Not equal to"}</option>
    <option value="more">{"(>) More than"}</option>
    <option value="less">{"(<) Less than"}</option>
    <option value="more-equal">{"(≥) More than or equal to"}</option>
    <option value="less-equal">{"(≤) Less than or equal to"}</option>
  </Select>
);

const AnswerSelect = ({ sections, type, ...otherProps }) => {
  const hasValidAnswers = !every(sections, section =>
    every(section.options, ({ disabled }) => disabled)
  );

  if (hasValidAnswers) {
    return <PageSelect groups={sections} {...otherProps} />;
  }

  return <NotAvailable type={type} />;
};

const MetadataSelect = props => (
  <Select {...props}>
    <option value="ru_ref">RU_REF</option>
    <option value="date">DATE</option>
    <option value="name">NAME</option>
  </Select>
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

const getTabContent = ({ sections, onChange, state, answerType }) => {
  const customValue = (
    <Flex id="custom">
      <Comparator>
        <NumericSelect
          onChange={onChange}
          name="numeric-select"
          id="numeric-select"
          defaultValue={state["numeric-select"]}
        />
      </Comparator>
      <Value>
        {answerType === CURRENCY && <CurrencySymbol>£ </CurrencySymbol>}
        <NumericInput
          type="number"
          name="custom-value"
          id="custom-value"
          placeholder={"Value"}
          onChange={onChange}
          value={state["custom-value"]}
          answerType={answerType}
        />
      </Value>
    </Flex>
  );

  const previousAnswer = (
    <Flex id="previous-answer">
      <Comparator>
        <NumericSelect
          onChange={onChange}
          name="numeric-select"
          id="numeric-select"
          value={state["numeric-select"]}
        />
      </Comparator>
      <Value>
        <AnswerSelect
          sections={sections}
          onChange={onChange}
          name="previous-answer"
          id="previous-answer"
          value={state["previous-answer"]}
          type={answerType}
        />
      </Value>
    </Flex>
  );

  const metaData = (
    <Flex id="metadata">
      <Comparator>
        <NumericSelect
          onChange={onChange}
          name="numeric-select"
          id="numeric-select"
          value={state["numeric-select"]}
        />
      </Comparator>
      <Value>
        <MetadataSelect
          onChange={onChange}
          name="metadata"
          id="metadata"
          value={state["metadata"]}
        />
      </Value>
    </Flex>
  );

  return [
    {
      id: "custom",
      title: "Custom value",
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
  id,
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

  const activeTabId = state[id] || "custom";

  const handleChange = ({ name, value }) => setState({ [name]: value });

  const tabItems = getTabContent({
    sections: convertToGroups(sections, condition),
    state,
    onChange: handleChange,
    answerType: type
  });

  const activeItem = find(tabItems, { id: activeTabId });

  return (
    <NumericAnswer data-test="options-selector">
      <PillTabs>
        {tabItems.map(item => (
          <PillTab
            role="tab"
            aria-selected={item.id === activeTabId}
            key={item.id}
            controls={item.id}
            onClick={() => setState({ [id]: item.id })}
          >
            {item.title}
          </PillTab>
        ))}
      </PillTabs>
      <TabsBody navItemId={activeItem.id} data-test="tabs-body">
        {activeItem.component}
      </TabsBody>
    </NumericAnswer>
  );
};

NumericAnswerSelector.propTypes = {
  id: PropTypes.string.isRequired
};

export default flow(
  withRouter,
  withLocalStorageState
)(NumericAnswerSelector);
