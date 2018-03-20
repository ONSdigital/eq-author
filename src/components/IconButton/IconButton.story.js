import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import IconButton from "components/IconButton";
import { action } from "@storybook/addon-actions";
import icon from "./test-icon.svg?inline";

const Wrapper = styled.div`
  padding: 1em;
  align-items: center;
`;

storiesOf("IconButton", module)
  .add("Single", () => (
    <Wrapper>
      <IconButton icon={icon} onClick={action("Click")}>
        Lorem ipsum
      </IconButton>
    </Wrapper>
  ))
  .add("IconOnly", () => (
    <Wrapper>
      <IconButton iconOnly icon={icon} onClick={action("Click")}>
        Lorem ipsum
      </IconButton>
    </Wrapper>
  ));
