import React from "react";
import { storiesOf } from "@storybook/react";
import Popout, { UncontrolledPopout } from "./index";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";

const Trigger = styled.button`
  border-radius: 2px;
  box-shadow: none;
  border: 1px solid #ccc;
  background: white;
  padding: 1em 2em;
  outline: none;

  &:active {
    background-color: #eee;
  }
`;

const Menu = styled.div`
  background-color: white;
  padding: 2em;
  box-shadow: rgba(0, 0, 0, 0.16) 0 5px 20px 0px;
  width: 340px;
`;

const CenterXY = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const CenterDecorator = storyFn =>
  <CenterXY>
    {storyFn()}
  </CenterXY>;

const trigger = <Trigger>Click me</Trigger>;
const content = (
  <Menu>
    <h2>Hello world</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ut ratione
      impedit, culpa cupiditate atque distinctio placeat. Beatae nam voluptas
      magnam, repellendus alias in officia nemo, voluptatum est velit vitae
    </p>
  </Menu>
);

storiesOf("Popout", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Stateless", () =>
    <Popout
      open={boolean("open", true)}
      trigger={trigger}
      onToggleOpen={action("onOpen")}
    >
      {content}
    </Popout>
  )
  .add("Stateful", () =>
    <UncontrolledPopout trigger={trigger}>
      {content}
    </UncontrolledPopout>
  );
