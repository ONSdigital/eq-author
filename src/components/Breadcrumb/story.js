import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import Breadcrumb from "components/Breadcrumb";
import { MemoryRouter } from "react-router";
import { colors } from "constants/theme";

const Background = styled.div`
  background: ${colors.darkBlue};
  padding: 1em;
  color: #fff;
`;

storiesOf("Breadcrumb", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>
      <Background>{story()}</Background>
    </MemoryRouter>
  ))
  .add("Default", () => <Breadcrumb title="Questionnaire" />);
