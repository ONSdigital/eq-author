import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import CanvasSection from "./CanvasSection";
import SeamlessInput from "./SeamlessInput";

storiesOf("CanvasSection", module)
  .addDecorator(withKnobs)
  .add("Default", () =>
    <CanvasSection id="foo" focussed={boolean("focussed", true)}>
      <SeamlessInput id="foo" value="Hello World" onChange={action("change")} />
    </CanvasSection>
  )
  .add("Following focus", () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          focussed: "section-1",
          foo: "hello",
          bar: "world"
        };
      }

      handleFocus = focussed => this.setState({ focussed });
      handleChange = ({ name, value }) => {
        this.setState({ [name]: value });
      };

      render() {
        const { focussed } = this.state;

        return (
          <div>
            <CanvasSection
              onFocus={this.handleFocus}
              id="section-1"
              focussed={focussed === "section-1"}
            >
              <SeamlessInput
                id="foo"
                value={this.state.foo}
                onChange={this.handleChange}
                autoFocus
              />
            </CanvasSection>
            <CanvasSection
              onFocus={this.handleFocus}
              id="section-2"
              focussed={focussed === "section-2"}
            >
              <SeamlessInput
                id="bar"
                value={this.state.bar}
                onChange={this.handleChange}
              />
            </CanvasSection>
          </div>
        );
      }
    }

    return <Wrapper />;
  });
