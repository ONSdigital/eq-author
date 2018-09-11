/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable dot-notation */

import React, { Fragment } from "react";
import styled from "styled-components";

import { PropTypes } from "prop-types";
import { radius, colors } from "constants/theme";

import { withLocalStorageState } from "./withLocalStorageState";
import { withRouter } from "react-router";

import { Input, Select } from "components/Forms";
import { Tab, Tabs, TabsBody } from "./Tabs";

import NumericOperatorSelect from "./NumericOperatorSelect";
import MetadataSelect from "./MetadataSelect";

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
import { DATE } from "constants/answer-types";
import { PageSelect } from "./RoutingCondition";
import { Alert, AlertTitle, AlertText } from "./Alert";

const DateAnswer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 1em;
  > * :not(:last-child) {
    margin-right: 1em;
  }
`;

const DateUnitSelect = ({ isMultiple, ...otherProps }) => (
  <Select {...otherProps}>
    <option value="days">Day/s</option>
    <option value="weeks">Week/s</option>
    <option value="months">Month/s</option>
    <option value="years">Year/s</option>
  </Select>
);

const BeforeAfterSelect = props => (
  <Select {...props}>
    <option value="before">Before</option>
    <option value="after">After</option>
  </Select>
);

const InfoBox = styled.div`
  border-radius: ${radius};
  padding: 0.5em;
  border: 1px solid ${colors.lightGrey};
  display: flex;
  align-items: center;
`;

const NumericInput = styled(Input)`
  border-radius: ${radius};
  &:hover {
    outline: none;
  }
`;

const hasValidAnswers = sections =>
  !every(sections, section =>
    every(section.options, ({ disabled }) => disabled)
  );

const DateComparisonFields = ({ id, condition, onChange, state, children }) => {
  const numericSelectId = `condition-${condition.id}-numeric-select`;
  const comparisonValueId = `condition-${condition.id}-comparison-value`;
  const dateUnitId = `condition-${condition.id}-date-unit`;
  const beforeAfterId = `condition-${condition.id}-before-after`;

  const isMultiple = parseInt(state[comparisonValueId], 10) > 1;

  return (
    <div style={{ flex: "1 1 auto" }}>
      <Flex>
        <NumericOperatorSelect
          onChange={onChange}
          name={numericSelectId}
          id={numericSelectId}
          defaultValue={state[numericSelectId]}
          style={{ flex: "1 0 14em" }}
        />
        <NumericInput
          onChange={onChange}
          name={comparisonValueId}
          id={comparisonValueId}
          value={state[comparisonValueId]}
        />
        <DateUnitSelect
          onChange={onChange}
          name={dateUnitId}
          id={dateUnitId}
          defaultValue={state[dateUnitId]}
          isMultiple={isMultiple}
        />
        <BeforeAfterSelect
          onChange={onChange}
          name={beforeAfterId}
          id={beforeAfterId}
          defaultValue={state[beforeAfterId]}
        />
      </Flex>
      <div style={{ flex: "1 1 auto" }}>{children}</div>
    </div>
  );
};

const CompletionDate = ({ condition, state, ...otherProps }) => (
  <DateComparisonFields condition={condition} state={state} {...otherProps}>
    <InfoBox>The date the respondent begins the the survey.</InfoBox>
  </DateComparisonFields>
);

const CustomValue = ({ condition, state, ...otherProps }) => {
  const id = `condition-${condition.id}-custom-value`;

  return (
    <DateComparisonFields condition={condition} state={state} {...otherProps}>
      <NumericInput
        type="date"
        style={{ width: "14em", height: "2.375em" }}
        placeholder="Custom value"
        id={id}
        name={id}
        value={state[id]}
        {...otherProps}
      />
    </DateComparisonFields>
  );
};

const PreviousAnswer = ({ condition, sections, state, ...otherProps }) => {
  const id = `condition-${condition.id}-previous-answer`;
  let value = null;

  if (condition.questionPage.id !== state[id]) {
    value = state[id];
  }

  return (
    <Fragment>
      {hasValidAnswers(sections) ? (
        <DateComparisonFields
          condition={condition}
          state={state}
          {...otherProps}
        >
          <PageSelect
            groups={sections}
            sections={sections}
            id={id}
            name={id}
            value={value}
            type={DATE}
            textSelect="Please select a previous question&hellip;"
            {...otherProps}
          />
        </DateComparisonFields>
      ) : (
        <Alert style={{ padding: "1em 2em" }}>
          <AlertTitle>
            There are no previous questions with a date answer
          </AlertTitle>
          <AlertText>
            Add a date answer to a previous question to be able to route from
            here.
          </AlertText>
        </Alert>
      )}
    </Fragment>
  );
};

const MetaData = ({ condition, state, answerType, ...otherProps }) => {
  const id = `condition-${condition.id}-metadata`;
  return (
    <DateComparisonFields
      condition={condition}
      state={state}
      answerType={answerType}
      {...otherProps}
    >
      <MetadataSelect
        id={id}
        name={id}
        value={state[id]}
        answerType={answerType}
        {...otherProps}
      />
    </DateComparisonFields>
  );
};

const getTabContent = props => {
  return [
    {
      id: "custom",
      title: "Custom",
      component: <CustomValue {...props} />
    },
    {
      id: "previous-answer",
      title: "Previous answer",
      component: <PreviousAnswer {...props} />
    },
    {
      id: "metadata",
      title: "Metadata",
      component: <MetaData {...props} />
    },
    {
      id: "completion-date",
      title: "Survey start date",
      component: <CompletionDate {...props} />
    }
  ];
};

const DateAnswerSelector = ({ condition, sections, state, setState }) => {
  const isAnswerValidForRouting = answer => get(answer, "type") === DATE;

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

  const tabsId = `${DATE}_${condition.id}`;

  const activeTabId = state[tabsId] || "custom";

  const handleChange = ({ name, value }) => setState({ [name]: value });

  const tabItems = getTabContent({
    condition: condition,
    sections: convertToGroups(sections, condition),
    state,
    onChange: handleChange,
    answerType: DATE
  });

  const activeItem = find(tabItems, { id: activeTabId });

  return (
    <DateAnswer data-test="options-selector">
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
      <TabsBody navItemId={activeItem.id} style={{ minHeight: " 124px" }}>
        {activeItem.component}
      </TabsBody>
    </DateAnswer>
  );
};

DateAnswerSelector.propTypes = {
  condition: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired
};

export default flow(
  withRouter,
  withLocalStorageState
)(DateAnswerSelector);
