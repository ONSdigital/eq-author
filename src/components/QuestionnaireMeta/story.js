import React from "react";
import { storiesOf } from "@storybook/react";
import QuestionnaireMeta from "components/QuestionnaireMeta";
import styled from "styled-components";

const Background = styled.span`
  padding: 1em;
  display: block;
  max-width: 40em;
`;

const questionnaire = {
  title: "Monthly Business Survey",
  description: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
  navigation: true,
  theme: "census"
};

storiesOf("QuestionnaireMeta", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Empty", () => <QuestionnaireMeta questionnaire={{}} />)
  .add("Prefilled", () => <QuestionnaireMeta questionnaire={questionnaire} />);
