import React from "react";
import { storiesOf } from "@storybook/react";
import IconButton from "components/IconDecorated/IconButton/index";
import { colors } from "constants/theme";
import styled from "styled-components";
import icon from "./icon-test.svg";

const Background = styled.span`
  background-color: ${colors.darkGrey};
  padding: 1em;
  display: inline-block;
`;

storiesOf("IconButton", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Preview", () => <IconButton icon={icon} title="Preview" disabled />)
  .add("Export", () => <IconButton icon={icon} title="Export" disabled />);
