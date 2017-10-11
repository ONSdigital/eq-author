import React from "react";
import { storiesOf } from "@storybook/react";
import IconLink from "components/IconLink";
import { colors } from "constants/theme";
import styled from "styled-components";

const Background = styled.span`
  background-color: ${colors.darkGrey};
  padding: 1em;
  display: inline-block;
`;

storiesOf("IconLink", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Preview", () => <IconLink icon="preview" title="Preview" disabled />)
  .add("Export", () => <IconLink icon="export" title="Export" disabled />);
