import React from "react";
import { set, merge } from "lodash";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import SectionEditor from "./index";

const CenterXY = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

class SectionEditorWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      "section.title": "Section title",
      "section.description": "Section description"
    };
  }

  handleChange = ({ name, value }) => {
    const newState = set(merge({}, this.state), name, value);
    this.setState(newState);
  };

  render() {
    return (
      <SectionEditor
        onChange={this.handleChange}
        sectionTitle={this.state["section.title"]}
        sectionDescription={this.state["section.description"]}
      />
    );
  }
}

const CenterDecorator = storyFn =>
  <CenterXY>
    {storyFn()}
  </CenterXY>;

storiesOf("SectionEditor", module)
  .addDecorator(CenterDecorator)
  .add("Default", () => <SectionEditorWrapper />);
