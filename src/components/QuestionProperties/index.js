import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";

import { Label, Field } from "components/Forms";
import ToggleSwitch from "components/ToggleSwitch";
import { colors } from "constants/theme";

import { connect } from "react-redux";
import { enableField, disableField } from "redux/properties/actions";

import { getProperties } from "redux/properties/reducer";
import IconText from "../IconText";

import InfoIcon from "./icon-info.svg?inline";

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
  padding: 0.5em 1em;
  border-bottom: 8px solid ${colors.lighterGrey};
`;

const PropertyLabel = styled(Label)`
  font-weight: normal;
`;

const Button = styled.button`
  --color-text: ${colors.primary};
  margin: 0.5em 0;
  position: relative;
  left: -0.5em;
  padding: 0;
  font-size: 1em;
  font-weight: bold;
  border: none;

  &:focus {
    outline: 2px solid ${colors.tertiary};
  }
`;

const PropertyDescription = styled.p`
  display: none;
  font-weight: normal;
  margin: 0 0 0.5em;
  font-size: 0.9em;
  color: #666;
`;

const Property = ({ id, children, onChange, checked }) => (
  <InlineField>
    <PropertyLabel inline htmlFor={id}>
      {children}
    </PropertyLabel>
    <ToggleSwitch id={id} name={id} onChange={onChange} checked={checked} />
  </InlineField>
);
class QuestionProperties extends React.Component {
  static propTypes = {
    page: CustomPropTypes.page.isRequired,
    onSubmit: PropTypes.func
  };

  handleChange = ({ name, value }) => {
    const { enableField, disableField, page } = this.props;
    if (value) {
      enableField(page.id, name);
    } else {
      disableField(page.id, name);
    }
  };

  render() {
    const { page, children, onHelpClick, properties } = this.props;

    return (
      <Properties>
        <PropertiesPanelTitle>Optional fields</PropertiesPanelTitle>
        <Property
          id="description"
          checked={properties.description.enabled}
          onChange={this.handleChange}
        >
          Question description
        </Property>

        <PropertyDescription>
          To provide added context to the question.
        </PropertyDescription>

        <Property
          id="definition"
          checked={properties.definition.enabled}
          onChange={this.handleChange}
        >
          Question definition
        </Property>

        <PropertyDescription>
          Only to be used to define word(s) or acronym(s) within the question.
        </PropertyDescription>

        <Property
          id="guidance"
          checked={properties.guidance.enabled}
          onChange={this.handleChange}
        >
          Include/exclude
        </Property>

        <PropertyDescription>
          Only to be used to state what should be included or excluded from the
          answer.
        </PropertyDescription>

        <Property
          id="additionalInfo"
          checked={properties.additionalInfo.enabled}
          onChange={this.handleChange}
        >
          Additional information
        </Property>

        <PropertyDescription>
          Information regarding why we are asking this question.
        </PropertyDescription>

        <Button onClick={onHelpClick}>
          <IconText icon={InfoIcon}>See how these fields are used</IconText>
        </Button>
      </Properties>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    properties: getProperties(state, ownProps.page.id)
  };
};

const mapDispatchToProps = dispatch => ({
  enableField: (pageId, fieldId) => dispatch(enableField({ pageId, fieldId })),
  disableField: (pageId, fieldId) => dispatch(disableField({ pageId, fieldId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionProperties);
