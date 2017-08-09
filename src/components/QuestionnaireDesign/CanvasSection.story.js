import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import CanvasSection from "./CanvasSection";
import SeamlessInput from "../SeamlessInput/SeamlessInput";

storiesOf("CanvasSection", module)
  .addDecorator(withKnobs)
  .add("Default", () =>
    <CanvasSection
      id="foo"
      focused={boolean("focused", true)}
      onFocus={action("focused")}
      onBlur={action("blurred")}
    >
      <SeamlessInput id="foo" value="Hello World" onChange={action("change")} />
    </CanvasSection>
  )
  .add("Following focus", () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          focused: "section-1",
          foo: "hello",
          bar: "world"
        };
      }

      handleFocus = focused => this.setState({ focused });

      handleChange = ({ name, value }) => {
        this.setState({ [name]: value });
      };

      render() {
        const { focused } = this.state;

        return (
          <div>
            <CanvasSection
              onFocus={this.handleFocus}
              id="section-1"
              focused={focused === "section-1"}
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
              focused={focused === "section-2"}
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
