import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";

import { Label, Field } from "components/Forms";
import ToggleSwitch from "components/ToggleSwitch";
import { colors } from "constants/theme";
import TextButton from "../TextButton";

const InlineField = styled(Field)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
`;

const PropertiesPanelTitle = styled.h2`
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 0.05em;
  vertical-align: middle;
  color: ${colors.darkGrey};
  text-align: center;
`;

const Properties = styled.div`
  padding: 0.5em;
  border-bottom: 8px solid ${colors.lighterGrey};
`;

const PropertyLabel = styled(Label)`
  font-weight: normal;
`;

const Button = styled.button`
  margin: 0.5em 0;
  padding: 0;
  font-size: 0.9em;
  font-weight: bold;
  color: ${colors.primary};
  border: none;
  &:focus {
    outline: 2px solid ${colors.tertiary};
  }
`;

class PageProperties extends React.Component {
  static propTypes = {
    page: CustomPropTypes.page.isRequired,
    onSubmit: PropTypes.func
  };

  handleChange = propName => ({ value }) => {};

  render() {
    const { page, children, onHelpClick } = this.props;
    return (
      <Properties>
        <PropertiesPanelTitle>Optional fields</PropertiesPanelTitle>
        <InlineField>
          <PropertyLabel inline htmlFor={"description"}>
            Description
          </PropertyLabel>
          <ToggleSwitch
            id={"description"}
            name={"name"}
            onChange={this.handleChange}
          />
        </InlineField>
        <InlineField>
          <PropertyLabel inline htmlFor={"guidance"}>
            Definition
          </PropertyLabel>
          <ToggleSwitch
            id={"guidance"}
            name={"name"}
            onChange={this.handleChange}
          />
        </InlineField>
        <InlineField>
          <PropertyLabel inline htmlFor={"include-exclude"}>
            Include and exclude
          </PropertyLabel>
          <ToggleSwitch
            id={"include-exclude"}
            name={"include-exclude"}
            onChange={this.handleChange}
          />
        </InlineField>
        <InlineField>
          <PropertyLabel inline htmlFor={"additional-info"}>
            Additional information
          </PropertyLabel>
          <ToggleSwitch
            id={"additional-info"}
            name={"additional-info"}
            onChange={this.handleChange}
          />
        </InlineField>
        <Button onClick={onHelpClick}>What are these options?</Button>
      </Properties>
    );
  }
}

export default PageProperties;
