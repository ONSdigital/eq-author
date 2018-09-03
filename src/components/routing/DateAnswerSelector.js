/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable dot-notation */

import React from "react";
import styled from "styled-components";

import { PropTypes } from "prop-types";
import { radius, colors } from "constants/theme";

import { withLocalStorageState } from "./withLocalStorageState";
import { withRouter } from "react-router";

import { Input, Select } from "components/Forms";
import { PillTab, PillTabs } from "./PillTabs";
import NotAvailable from "./NotAvailableMsg";
import NumericSelect from "./NumericSelect";
import MetadataSelect from "./MetadataSelect";

import IconInfo from "./icon-info.svg?inline";

import { TabsBody } from "components/ModalWithNav/Tabs";

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

const DateAnswer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0;
  margin: 0.25em 0;
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
  background: ${colors.lighterGrey};

  display: flex;
  align-items: center;
`;

const NumericInput = styled(Input)`
  border-radius: ${radius};
`;

const AnswerSelect = ({ sections, type, ...otherProps }) => {
  const hasValidAnswers = !every(sections, section =>
    every(section.options, ({ disabled }) => disabled)
  );

  if (hasValidAnswers) {
    return <PageSelect groups={sections} {...otherProps} />;
  }

  return <NotAvailable type={type} />;
};

const DateComparisonFields = ({ id, condition, onChange, state, children }) => {
  const completionDateId = `condition-${condition.id}-completion-date`;
  const numericSelectId = `condition-${condition.id}-numeric-select`;
  const customValueId = `condition-${condition.id}-custom-value`;
  const previousAnswerId = `condition-${condition.id}-previous-answer`;
  const metadataId = `condition-${condition.id}-metadata`;

  const comparisonValueId = `condition-${condition.id}-comparison-value`;
  const dateUnitId = `condition-${condition.id}-date-unit`;
  const beforeAfterId = `condition-${condition.id}-before-after`;

  const isMultiple = parseInt(state[comparisonValueId], 10) > 1;

  return (
    <div>
      <Flex>
        <NumericSelect
          onChange={onChange}
          name={numericSelectId}
          id={numericSelectId}
          defaultValue={state[numericSelectId]}
          style={{ flex: "1 0 15em" }}
        />
        <NumericInput
          onChange={onChange}
          name={comparisonValueId}
          id={comparisonValueId}
          value={state[comparisonValueId]}
          placeholder="Number"
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
        />
      </Flex>
      <div>{children}</div>
    </div>
  );
};

const getTabContent = ({ sections, ...otherProps }) => {
  const completionDate = (
    <DateComparisonFields {...otherProps}>
      <InfoBox>
        <IconInfo />
        <span>The date the respondent begins the the survey.</span>
      </InfoBox>
    </DateComparisonFields>
  );
  const customValue = (
    <DateComparisonFields {...otherProps}>Custom Value</DateComparisonFields>
  );
  const previousAnswer = (
    <DateComparisonFields {...otherProps}>
      <AnswerSelect sections={sections} {...otherProps} type={DATE} />
    </DateComparisonFields>
  );
  const metaData = (
    <DateComparisonFields {...otherProps}>Metadata</DateComparisonFields>
  );

  return [
    {
      id: "completion-date",
      title: "Survey start date",
      component: completionDate
    },
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
      <PillTabs>
        {tabItems.map(item => (
          <PillTab
            role="tab"
            aria-selected={item.id === activeTabId}
            key={item.id}
            controls={item.id}
            onClick={() => setState({ [tabsId]: item.id })}
          >
            {item.title}
          </PillTab>
        ))}
      </PillTabs>
      <TabsBody navItemId={activeItem.id} data-test="tabs-body">
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
