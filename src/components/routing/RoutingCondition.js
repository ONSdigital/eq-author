import React from "react";
import styled from "styled-components";

import DeleteButton from "components/DeleteButton";
import IconClose from "./icon-close.svg?inline";
import { PropTypes } from "prop-types";
import CustomPropTypes from "custom-prop-types";

import { Grid, Column } from "components/Grid";
import { NavLink } from "react-router-dom";

import svgPath from "./path.svg";
import svgPathEnd from "./path-end.svg";
import IconText from "components/IconText";
import {
  get,
  isNil,
  isEmpty,
  lowerCase,
  uniqueId,
  first,
  flow,
  negate,
  overSome
} from "lodash";
import MultipleChoiceAnswerOptionsSelector from "components/routing/MultipleChoiceAnswerOptionsSelector";
import GroupedSelect from "./GroupedSelect";
import Transition from "components/routing/Transition";
import { TransitionGroup } from "react-transition-group";
import { Alert, AlertTitle, AlertText } from "components/routing/Alert";
import { buildPagePath } from "utils/UrlUtils";
import isAnswerValidForRouting from "./isAnswerValidForRouting";

import routingConditionFragment from "graphql/fragments/routing-condition.graphql";

const Label = styled.label`
  width: 100%;
  display: inline-block;
  font-size: 0.9em;
  letter-spacing: 0.05em;
  font-weight: bold;
  text-align: center;
  align-self: center;
`;

export const PageSelect = styled(GroupedSelect).attrs({
  onChange: props => ({ value }) => props.onChange(value)
})`
  margin: 0;
  align-self: center;
`;

const ConnectedPath = styled.div`
  position: relative;
  height: 100%;

  &::after {
    position: absolute;
    content: "";
    background: url(${({ pathEnd }) => (pathEnd ? svgPathEnd : svgPath)})
      no-repeat center center;
    background-size: auto;
    width: 100%;
    height: calc(100% - 2em);
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;

const RemoveButton = styled(DeleteButton)`
  display: block;
  margin: auto;
  position: relative;
  right: 2px;
`;

const firstAnswerIsValid = flow(first, isAnswerValidForRouting);
const shouldDisable = overSome([isEmpty, negate(firstAnswerIsValid)]);

const convertToGroups = sections =>
  sections.map(section => ({
    label: section.plaintextTitle || "Section Title",
    id: section.id,
    options: section.pages.map(page => ({
      label: page.plaintextTitle || "Page Title",
      value: page.id,
      disabled: shouldDisable(page.answers)
    }))
  }));

const renderNoAnswer = params => (
  <Transition exit={false}>
    <Alert data-test="no-answer-msg">
      <AlertTitle>No answers have been added to this question yet.</AlertTitle>
      <AlertText>
        First, <NavLink to={buildPagePath(params)}>add an answer</NavLink> to
        continue.
      </AlertText>
    </Alert>
  </Transition>
);

const renderUnsupportedAnswer = answer => (
  <Transition key="answer" exit={false}>
    <Alert data-test="invalid-answer-type-msg">
      <AlertTitle>Routing is not available for this type of answer</AlertTitle>
      <AlertText>
        You cannot route on &lsquo;{lowerCase(answer.type)}&rsquo; answers.
      </AlertText>
    </Alert>
  </Transition>
);

const renderDeletedQuestion = () => (
  <Transition key="answer" exit={false}>
    <Alert data-test="deleted-answer-msg">
      <AlertTitle>
        The question this condition referred to has been deleted
      </AlertTitle>
      <AlertText>
        Please select a new question from the dropdown above.
      </AlertText>
    </Alert>
  </Transition>
);

const renderCannotAddAndCondition = () => (
  <Transition key="answer" exit={false}>
    <Alert data-test="and-not-valid-msg">
      <AlertTitle>
        AND condition not valid with &lsquo;radio button&rsquo; answer
      </AlertTitle>
      <AlertText>Please select a different question.</AlertText>
    </Alert>
  </Transition>
);

const renderEditor = (condition, onToggleOption) => (
  <Transition key="answer" exit={false}>
    <MultipleChoiceAnswerOptionsSelector
      condition={condition}
      onOptionSelectionChange={onToggleOption}
    />
  </Transition>
);

const RoutingCondition = ({
  condition,
  ruleId,
  sections,
  label,
  onPageChange,
  onRemove,
  onToggleOption,
  canAddAndCondition,
  match
}) => {
  let editor;
  let value = get(condition, "questionPage.id");
  let pageSelectIsValid;

  if (isNil(condition.questionPage)) {
    editor = renderDeletedQuestion();
  } else if (isNil(condition.answer)) {
    value = null;
    pageSelectIsValid = false;
    editor = renderNoAnswer(match.params);
  } else if (!isAnswerValidForRouting(condition.answer)) {
    value = null;
    pageSelectIsValid = false;
    editor = renderUnsupportedAnswer(condition.answer);
  } else if (!canAddAndCondition) {
    pageSelectIsValid = false;
    editor = renderCannotAddAndCondition();
  } else {
    editor = renderEditor(condition, onToggleOption);
  }

  const id = uniqueId("RoutingCondition");
  const handleRemove = onRemove ? () => onRemove(ruleId, condition.id) : null;
  const handleChange = ({ value }) =>
    onPageChange({ id: condition.id, questionPageId: value });

  return (
    <div data-test="routing-condition">
      <Grid align="center">
        <Column gutters={false} cols={1}>
          <Label htmlFor={id}>{label}</Label>
        </Column>
        <Column gutters={false} cols={10}>
          <PageSelect
            value={value}
            valid={pageSelectIsValid}
            onChange={handleChange}
            groups={convertToGroups(sections)}
            id={id}
          />
        </Column>
        <Column gutters={false} cols={1}>
          <RemoveButton
            onClick={handleRemove}
            disabled={!onRemove}
            data-test="btn-remove"
          >
            <IconText icon={IconClose} hideText>
              Remove
            </IconText>
          </RemoveButton>
        </Column>
      </Grid>
      <Grid>
        <Column gutters={false} cols={1}>
          <ConnectedPath pathEnd={isNil(condition.answer)} />
        </Column>
        <Column gutters={false} cols={10}>
          <TransitionGroup>{editor}</TransitionGroup>
        </Column>
        <Column cols={1} />
      </Grid>
    </div>
  );
};

RoutingCondition.propTypes = {
  ruleId: PropTypes.string.isRequired,
  condition: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  sections: PropTypes.arrayOf(CustomPropTypes.section).isRequired,
  onPageChange: PropTypes.func.isRequired,
  onToggleOption: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  label: PropTypes.oneOf(["IF", "AND"]).isRequired,
  match: CustomPropTypes.match,
  canAddAndCondition: PropTypes.bool.isRequired
};

RoutingCondition.defaultProps = {
  label: "IF"
};

RoutingCondition.fragments = {
  RoutingCondition: routingConditionFragment
};

export default RoutingCondition;
