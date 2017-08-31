import React from "react";
import { set, merge } from "lodash";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import PageEditor from "./index";

const CenterXY = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

class PageEditorWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      "page.title": "Page title",
      "page.description": "Page description",
      "page.guidance": "Page guidance"
    };
    this.pagetTitleInput = undefined;
  }

  handleChange = ({ name, value }) => {
    const newState = set(merge({}, this.state), name, value);
    this.setState(newState);
  };

  pageTitleRef = input => {
    this.pageTitleInput = input;
  };

  render() {
    return (
      <PageEditor
        onChange={this.handleChange}
        pageTitle={this.state["page.title"]}
        pageTitleRef={this.pageTitleRef}
        pageDescription={this.state["page.description"]}
        pageGuidance={this.state["page.guidance"]}
      />
    );
  }
}

const CenterDecorator = storyFn =>
  <CenterXY>
    {storyFn()}
  </CenterXY>;

storiesOf("Page Editor", module)
  .addDecorator(CenterDecorator)
  .add("Default", () => <PageEditorWrapper />);
