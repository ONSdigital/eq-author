import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";

import { Label, Field } from "components/Forms";
import ToggleSwitch from "components/ToggleSwitch";
import { colors } from "constants/theme";

import { connect } from "react-redux";
import { enableField, disableField } from "redux/properties/actions";
import { get } from "lodash";
import { getProperties } from "redux/properties/reducer";

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
  font-weight: bold;
`;

const Button = styled.button`
  margin: 0.5em 0;
  padding: 0;
  font-size: 1em;
  font-weight: bold;
  color: ${colors.primary};
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
          checked={properties.description}
          onChange={this.handleChange}
        >
          Description
        </Property>

        <PropertyDescription>
          To provide added context to the question.
        </PropertyDescription>

        <Property
          id="definition"
          checked={properties.definition}
          onChange={this.handleChange}
        >
          Definition
        </Property>

        <PropertyDescription>
          Only to be used to define word(s) or acronym(s) within the question.
        </PropertyDescription>

        <Property
          id="guidance"
          checked={properties.guidance}
          onChange={this.handleChange}
        >
          Include & exclude
        </Property>

        <PropertyDescription>
          Only to be used to state what should be included or excluded from the
          answer.
        </PropertyDescription>

        <Property
          id="additionalInfo"
          checked={properties.additionalInfo}
          onChange={this.handleChange}
        >
          Additional information
        </Property>

        <PropertyDescription>
          Information regarding why we are asking this question.
        </PropertyDescription>
        <Button onClick={onHelpClick}>More information</Button>
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