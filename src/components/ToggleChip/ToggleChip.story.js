import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import ToggleChip from "components/ToggleChip";
import { uniqueId } from "lodash";

const Wrapper = styled.div`
  padding: 1em;
  width: 50%;
`;

class StatefulToggleChip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };
  }

  handleChange = ({ value }) => {
    this.setState({
      value
    });
  };

  render() {
    return (
      <ToggleChip
        id={uniqueId()}
        onChange={this.handleChange}
        checked={this.state.value}
        {...this.props}
      />
    );
  }
}

storiesOf("ToggleChip", module)
  .add("Single", () => (
    <Wrapper>
      <StatefulToggleChip>Lorem ipsum dolor sit amet.</StatefulToggleChip>
    </Wrapper>
  ))
  .add("Multiple", () => (
    <Wrapper>
      <StatefulToggleChip>Lorem ipsum dolor.</StatefulToggleChip>
      <StatefulToggleChip>Lorem ipsum dolor sit.</StatefulToggleChip>
      <StatefulToggleChip>Lorem ipsum.</StatefulToggleChip>
      <StatefulToggleChip>Lorem ipsum dolor sit amet.</StatefulToggleChip>
      <StatefulToggleChip>Lorem ipsum dolor sit.</StatefulToggleChip>
      <StatefulToggleChip>Lorem ipsum.</StatefulToggleChip>
      <StatefulToggleChip>Lorem.</StatefulToggleChip>
      <StatefulToggleChip title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum quos saepe voluptatem. Ab consectetur dolore ea eaque excepturi praesentium voluptate.">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum quos
        saepe voluptatem. Ab consectetur dolore ea eaque excepturi praesentium
        voluptate.
      </StatefulToggleChip>
    </Wrapper>
  ));
