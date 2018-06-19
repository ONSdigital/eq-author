import React from "react";
import styled from "styled-components";
import GroupedSelect from "./GroupedSelect";
import { Grid, Column } from "components/Grid";
import PropTypes from "prop-types";

const RoutingRuleResult = styled.div`
  padding: 1em;
`;

const Label = styled.label`
  width: 100%;
  display: block;
  font-size: 0.9em;
  font-weight: bold;
  &[disabled] {
    opacity: 0.5;
  }
`;

const Goto = styled.span`
  float: right;
  margin-right: 1em;
`;

const LogicalDestinations = {
  END_OF_QUESTIONNAIRE: "EndOfQuestionnaire"
};

const toOption = (destinationType, defaultTitle) => x => ({
  label: x.plaintextTitle || defaultTitle,
  value: {
    absoluteDestination: {
      destinationType,
      destinationId: x.id
    }
  }
});

class RoutingRuleResultSelector extends React.Component {
  getRoutingOptions({ questionPages, sections }) {
    const pagesGroup = {
      label: "Questions in this section",
      options: questionPages.map(toOption("QuestionPage", "Page Title"))
    };

    const sectionsGroup = {
      label: "Other sections",
      options: sections.map(toOption("Section", "Section Title"))
    };

    const summaryGroup = {
      label: "Questionnaire Summary",
      options: [
        {
          label: "Summary",
          value: {
            logicalDestination: {
              destinationType: LogicalDestinations.END_OF_QUESTIONNAIRE
            }
          }
        }
      ]
    };

    return [pagesGroup, sectionsGroup, summaryGroup].filter(
      group => group.options.length
    );
  }

  convertValue(value) {
    if (!value) {
      return null;
    }

    const { absoluteDestination, logicalDestination } = value;

    if (absoluteDestination) {
      return {
        absoluteDestination: {
          destinationType: absoluteDestination.__typename,
          destinationId: absoluteDestination.id
        }
      };
    } else {
      return {
        logicalDestination: {
          destinationType: logicalDestination
        }
      };
    }
  }

  handleChange = ({ value }) => {
    this.props.onChange(JSON.parse(value));
  };

  render() {
    const { routingOptions, label, id, value, disabled } = this.props;

    const convertedValue = this.convertValue(value);
    const groups = this.getRoutingOptions(routingOptions);
    groups.forEach(group =>
      group.options.forEach(option => {
        option.value = JSON.stringify(option.value);
      })
    );

    return (
      <RoutingRuleResult key={id}>
        <Grid align="center">
          <Column gutters={false} cols={5}>
            <Label htmlFor={id} disabled={disabled}>
              {label} <Goto>Go to: </Goto>
            </Label>
          </Column>
          <Column gutters={false} cols={7}>
            <GroupedSelect
              id={id}
              value={convertedValue ? JSON.stringify(convertedValue) : null}
              groups={groups}
              onChange={this.handleChange}
              disabled={disabled}
              data-test="result-selector"
            />
          </Column>
        </Grid>
      </RoutingRuleResult>
    );
  }
}

RoutingRuleResultSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  routingOptions: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.object,
  disabled: PropTypes.bool.isRequired
};

RoutingRuleResultSelector.defaultProps = {
  disabled: false,
  loading: false
};

export default RoutingRuleResultSelector;
