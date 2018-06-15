import React from "react";
import styled from "styled-components";
import Select from "components/Forms/Select";
import { Grid, Column } from "components/Grid";
import PropTypes from "prop-types";
import { map, isEmpty, negate, filter, flow, get } from "lodash/fp";

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

const toOption = destinationType => x => ({
  title: x.plaintextTitle,
  value: {
    absoluteDestination: {
      destinationType,
      destinationId: x.id
    }
  }
});

const filterNonEmptyGroups = filter(flow(get("pages"), negate(isEmpty)));

const SUMMARY_GROUP = {
  title: "Questionnaire Summary",
  pages: [
    {
      title: "Summary",
      value: {
        logicalDestination: {
          destinationType: LogicalDestinations.END_OF_QUESTIONNAIRE
        }
      }
    }
  ]
};

class RoutingRuleResultSelector extends React.Component {
  getRoutingOptions({ questionPages, sections }) {
    const pagesGroup = {
      title: "Questions in this section",
      pages: map(toOption("QuestionPage"), questionPages)
    };

    const sectionsGroup = {
      title: "Other sections",
      pages: map(toOption("QuestionPage"), sections)
    };

    return filterNonEmptyGroups([pagesGroup, sectionsGroup, SUMMARY_GROUP]);
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
    }

    if (logicalDestination) {
      return {
        logicalDestination: {
          destinationType: logicalDestination
        }
      };
    }

    return null;
  }

  handleChange = ({ value }) => {
    this.props.onChange(JSON.parse(value));
  };

  render() {
    const { routingOptions, label, id, value, disabled } = this.props;
    const options = this.getRoutingOptions(routingOptions);
    const convertedValue = JSON.stringify(this.convertValue(value));

    return (
      <RoutingRuleResult key={id}>
        <Grid align="center">
          <Column gutters={false} cols={5}>
            <Label htmlFor={id} disabled={disabled}>
              {label} <Goto>Go to: </Goto>
            </Label>
          </Column>
          <Column gutters={false} cols={7}>
            <Select
              value={convertedValue}
              id={id}
              onChange={this.handleChange}
              disabled={disabled}
              data-test="result-selector"
            >
              {options.map(routingOption => (
                <optgroup
                  label={routingOption.title || "Section Title"}
                  key={routingOption.title}
                >
                  {routingOption.pages.map(page => (
                    <option
                      value={JSON.stringify(page.value)}
                      key={JSON.stringify(page.value)}
                      disabled={page.disabled}
                    >
                      {page.title || "Page Title"}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
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
