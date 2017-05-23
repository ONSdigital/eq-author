import React from "react";
import styled from "styled-components";
import { colorBorders } from "constants/theme";

import { Tabs, TabList, TabTitle, TabPanel } from "components/Tabs";
import { AnswerOptions } from "components/Options/Answer";
import { QuestionOptions } from "components/Options/Question";
import { SectionOptions } from "components/Options/Section";

import Button from "components/Button";

const OptionsPanel = styled.div`
  background: white;
  border: 1px solid ${colorBorders};
  width: 100%;
`;

const Header = styled.div`
  border-bottom: 1px solid ${colorBorders};
  padding: 0.5em 0.5rem;
  position: relative;
  display: flex;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 0.9em;
  line-height: 1;
  margin: 0;
  align-self: center;
  padding-left: 0.5em;
`;

const Body = styled.div`

`;

const DeleteButton = styled(Button)`
  margin-left: auto;
`;

const getOptions = type => {
  return {
    answers: AnswerOptions,
    questions: QuestionOptions,
    sections: SectionOptions
  }[type];
};

export default ({ selected, deleteItem, ...otherProps }) => {
  const { type, id, item } = selected;
  const Options = getOptions(type);
  const handleDelete = () => deleteItem(type, id);
  if (Options === undefined) {
    return null;
  }

  return (
    <OptionsPanel {...otherProps}>
      <Header>
        <Title>{item.displayName || item.title}</Title>
        <DeleteButton onClick={handleDelete} small tertiary>
          Delete
        </DeleteButton>
      </Header>
      <Body>
        <Tabs compact>
          <TabList compact>
            {Options.map(option => (
              <TabTitle compact key={option.label}>
                {option.label}
              </TabTitle>
            ))}
          </TabList>
          {Options.map(option => (
            <TabPanel compact key={option.label}>
              <option.component
                options={{
                  ...item,
                  id,
                  type
                }}
              />
            </TabPanel>
          ))}
        </Tabs>
      </Body>
    </OptionsPanel>
  );
};
