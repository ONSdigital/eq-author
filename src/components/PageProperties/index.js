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
  font-weight: bold;
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

const PropertyDescription = styled.p`
  display: none;
  font-weight: normal;
  margin: 0 0 0.5em;
  font-size: 0.9em;
  color: #666;
`;

class PageProperties extends React.Component {
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
    const pageProps = properties[page.id];

    return (
      <Properties>
        <PropertiesPanelTitle>Optional fields</PropertiesPanelTitle>
        <InlineField>
          <PropertyLabel inline htmlFor={"description"}>
            Description
          </PropertyLabel>
          <ToggleSwitch
            id={"description"}
            name={"description"}
            onChange={this.handleChange}
            checked={get(pageProps, "description")}
          />
        </InlineField>
        <PropertyDescription>
          To provide added context to the question.
        </PropertyDescription>
        <InlineField>
          <PropertyLabel inline htmlFor={"guidance"}>
            Definition
          </PropertyLabel>
          <ToggleSwitch
            id={"guidance"}
            name={"guidance"}
            onChange={this.handleChange}
            checked={get(pageProps, "guidance")}
          />
        </InlineField>
        <PropertyDescription>
          Only to be used to define word(s) or acronym(s) within the question.
        </PropertyDescription>
        <InlineField>
          <PropertyLabel inline htmlFor={"includeExclude"}>
            Include and exclude
          </PropertyLabel>
          <ToggleSwitch
            id={"includeExclude"}
            name={"includeExclude"}
            onChange={this.handleChange}
            checked={get(pageProps, "includeExclude")}
          />
        </InlineField>
        <PropertyDescription>
          Only to be used to state what should be included or excluded from the
          answer.
        </PropertyDescription>
        <InlineField>
          <PropertyLabel inline htmlFor={"additionalInfo"}>
            Additional information
          </PropertyLabel>
          <ToggleSwitch
            id={"additionalInfo"}
            name={"additionalInfo"}
            onChange={this.handleChange}
            checked={get(pageProps, "additionalInfo")}
          />
        </InlineField>
        <PropertyDescription>
          Information regarding why we are asking this question.
        </PropertyDescription>
        <Button onClick={onHelpClick}>What are these options?</Button>
      </Properties>
    );
  }
}

const mapStateToProps = state => ({
  properties: state.properties
});

const mapDispatchToProps = dispatch => ({
  enableField: (pageId, fieldId) => dispatch(enableField({ pageId, fieldId })),
  disableField: (pageId, fieldId) => dispatch(disableField({ pageId, fieldId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageProperties);
