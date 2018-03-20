import React from "react";
import { storiesOf } from "@storybook/react";
import IconLink from "components/IconLink";
import { colors } from "constants/theme";
import styled from "styled-components";
import testIcon from "./icon-test.svg?inline";

const Background = styled.span`
  background-color: ${colors.darkGrey};
  padding: 1em;
  display: inline-block;
`;

storiesOf("IconLink", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Preview", () => (
    <IconLink href="" icon={testIcon} title="Preview" disabled />
  ));
