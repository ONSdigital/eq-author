import React from "react";
import { storiesOf } from "@storybook/react";
import IconButton from "components/IconButton";
import { colors } from "constants/theme";
import styled from "styled-components";

const Background = styled.span`
  background-color: ${colors.darkGrey};
  padding: 1em;
  display: inline-block;
`;

storiesOf("IconButton", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Preview", () => <IconButton icon="preview" title="Preview" disabled />)
  .add("Export", () => <IconButton icon="export" title="Export" disabled />);
