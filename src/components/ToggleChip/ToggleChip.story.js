import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import { ToggleChip, ToggleChipGroup } from "components/ToggleChip";
import { uniqueId } from "lodash";
import { h1 } from "draft-js-raw-content-state/build/utils/blockTypes";

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

  handleChange = e => {
    this.setState({
      value: e.target.checked
    });
  };

  render() {
    return (
      <ToggleChip
        id={uniqueId()}
        onChange={this.handleChange}
        value={uniqueId()}
        checked={this.state.value}
        {...this.props}
      />
    );
  }
}

console.log(ToggleChipGroup);

class ToggleChipGroupContainer extends React.Component {
  state = {
    value: "123"
  };

  handleChange = ({ value }) => {
    this.setState({ value });
  };

  render() {
    return (
      <ToggleChipGroup
        onChange={this.handleChange}
        value={this.state.value}
        name="haha"
      >
        <ToggleChip title="hello" value="1">
          foo
        </ToggleChip>
        <ToggleChip title="hello" value="2">
          bar
        </ToggleChip>
        <ToggleChip title="hello" value="123">
          blah
        </ToggleChip>
      </ToggleChipGroup>
    );
  }
}

storiesOf("ToggleChip", module)
  .add("Single", () => (
    <Wrapper>
      <StatefulToggleChip title="Lorem ipsum dolor sit amet.">
        Lorem ipsum dolor sit amet.
      </StatefulToggleChip>
    </Wrapper>
  ))
  .add("Multiple", () => (
    <Wrapper>
      <StatefulToggleChip title="Lorem ipsum dolor.">
        Lorem ipsum dolor.
      </StatefulToggleChip>
      <StatefulToggleChip title="Lorem ipsum dolor sit.">
        Lorem ipsum dolor sit.
      </StatefulToggleChip>
      <StatefulToggleChip title="Lorem ipsum.">Lorem ipsum.</StatefulToggleChip>
      <StatefulToggleChip title="Lorem ipsum dolor sit amet.">
        Lorem ipsum dolor sit amet.
      </StatefulToggleChip>
      <StatefulToggleChip title="Lorem ipsum dolor sit.">
        Lorem ipsum dolor sit.
      </StatefulToggleChip>
      <StatefulToggleChip title="Lorem ipsum.">Lorem ipsum.</StatefulToggleChip>
      <StatefulToggleChip title="Lorem.">Lorem.</StatefulToggleChip>
      <StatefulToggleChip title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum quos
      saepe voluptatem. Ab consectetur dolore ea eaque excepturi praesentium
      voluptate.">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum quos
        saepe voluptatem. Ab consectetur dolore ea eaque excepturi praesentium
        voluptate.
      </StatefulToggleChip>
    </Wrapper>
  ))
  .add("Grouped", () => <ToggleChipGroupContainer />);
