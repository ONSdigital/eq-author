import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { set } from "lodash";
import PageProperties from "components/PageProperties";
import styled from "styled-components";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

class Page extends React.Component {
  constructor(props) {
    super();
    this.state = { page: { type: "Question", order: "1" } };
  }

  handleChange = ({ name, value }) => {
    this.setState(set(this.state, name, value));
  };

  handleBlur = () => {
    action("blur");
  };

  handleSubmit = () => {
    action("submit");
  };

  render = () =>
    <PageProperties
      page={this.state.page}
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      onSubmit={this.handleSubmit}
      orderMin={0}
      orderMax={12}
    />;
}

storiesOf("Properties/Page", module).add("Default", () =>
  <Background>
    <Page />
  </Background>
);
