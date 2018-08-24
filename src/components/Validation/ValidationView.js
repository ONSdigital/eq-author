import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TransitionGroup } from "react-transition-group";
import { uniqueId } from "lodash";

import FadeTransition from "components/FadeTransition";
import ToggleSwitch from "components/ToggleSwitch";
import { Label, Field } from "components/Forms";

const DisabledMsg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  font-weight: bold;
  margin-bottom: 3em;
`;

const InlineField = styled(Field)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const ValidationContainer = styled(Container)`
  padding: 1em 0;
`;

class ValidationView extends Component {
  renderDisabled = () => <DisabledMsg>Min value is disabled</DisabledMsg>;

  renderChildren = () => (
    <ValidationContainer>{this.props.children}</ValidationContainer>
  );

  render() {
    const { enabled, onToggleChange, ...otherProps } = this.props;
    const id = uniqueId("ValidationView");

    return (
      <Container {...otherProps}>
        <InlineField data-test="validation-view-toggle">
          <ToggleSwitch
            id={id}
            name={id}
            onChange={onToggleChange}
            checked={enabled}
          />
          <Label inline htmlFor={id}>
            On
          </Label>
        </InlineField>

        <TransitionGroup component={Container}>
          <FadeTransition
            key={`validation-enabled-${enabled}`}
            enter
            exit={false}
          >
            {enabled ? this.renderChildren() : this.renderDisabled()}
          </FadeTransition>
        </TransitionGroup>
      </Container>
    );
  }
}

ValidationView.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  onToggleChange: PropTypes.func.isRequired
};

export default ValidationView;
