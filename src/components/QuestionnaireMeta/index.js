import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Form, Field, Input, Label } from "components/Forms";
import withEntityEditor from "components/withEntityEditor";
import questionnaireFragment from "graphql/fragments/questionnaire.graphql";
import ToggleSwitch from "components/ToggleSwitch";
import styled from "styled-components";
import showNavIcon from "./icon-show-nav.svg";
import showConfirmationIcon from "./icon-show-confirmation.svg";

const Icon = styled.img`
  height: 3em;
  vertical-align: middle;
  margin-right: 1em;
  transition: opacity 100ms linear;
  opacity: ${props => (props.fade ? 0.5 : 1)};
`;

const InlineField = styled(Field)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  margin-bottom: 0;

  border-top: 1px solid #ebebeb;

  &:last-child {
    border-bottom: 1px solid #ebebeb;
  }
`;

const ToggleWrapper = styled.div`
  margin: 2em 0 3em 0;
`;

export const StatelessQuestionnaireMeta = ({
  questionnaire,
  onSubmit,
  onChange,
  children
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Field id="title">
        <Label>Questionnaire Title</Label>
        <Input
          autoFocus
          defaultValue={questionnaire.title}
          onChange={onChange}
          required
        />
      </Field>
      <ToggleWrapper>
        <InlineField id="navigation">
          <Label inline>
            <Icon src={showNavIcon} alt="" fade={!questionnaire.navigation} />
            Show section navigation
          </Label>
          <ToggleSwitch
            name="navigation"
            onChange={onChange}
            checked={questionnaire.navigation}
          />
        </InlineField>
        <InlineField id="summary">
          <Label inline>
            <Icon
              src={showConfirmationIcon}
              alt=""
              fade={!questionnaire.summary}
            />
            Show summary on confirmation page
          </Label>
          <ToggleSwitch
            name="summary"
            onChange={onChange}
            checked={questionnaire.summary}
          />
        </InlineField>
      </ToggleWrapper>
      {children}
    </Form>
  );
};

StatelessQuestionnaireMeta.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  questionnaire: CustomPropTypes.questionnaire
};

export default withEntityEditor("questionnaire", questionnaireFragment)(
  StatelessQuestionnaireMeta
);
