import React, { Component } from "react";
import styled from "styled-components";
import { forOwn } from "lodash";

import DateSelector from "./DateSelector";
import NumericSelector from "./NumericSelector";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`;

class DateComparisonSelector extends Component {
  render() {
    const { selectedOptions, ...otherProps } = this.props;
    let date = {};
    let numeric = {};
    forOwn(selectedOptions, (opt, id) => {
      const option = { [id]: opt };
      opt.type === "Date" ? (date = option) : (numeric = option);
    });

    return (
      <Flex>
        <DateSelector
          selectedOptions={date}
          multiselect={false}
          completionOption
          {...otherProps}
        />
        <NumericSelector
          selectedOptions={numeric}
          multiselect={false}
          {...otherProps}
        />
      </Flex>
    );
  }
}

export default DateComparisonSelector;
