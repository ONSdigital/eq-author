import React from "react";
import { storiesOf } from "@kadira/storybook";
import IconButton, { icons } from "components/IconButton";
import { darkGrey } from "constants/theme";
import styled from "styled-components";

const Background = styled.span`
  background-color: ${darkGrey};
  padding: 1em;
  display: inline-block;
`;

storiesOf("IconButton", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Default", () => <IconButton icon={icons.exportIcon} title="Export" />)
  .add("Disabled", () =>
    <IconButton icon={icons.exportIcon} title="Export" disabled />
  );
