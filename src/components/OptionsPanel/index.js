import React from 'react';
import styled from 'styled-components';
import {colorBorders} from 'constants/theme';

import {Tabs, TabList, TabTitle, TabPanel} from 'components/Tabs';
import {AnswerOptions} from 'components/Options/Answer';
import {QuestionOptions} from 'components/Options/Question';
import {SectionOptions} from 'components/Options/Section';

const OptionsPanel = styled.div`
  background: white;
  border: 1px solid ${colorBorders};
  width: 100%;
`;

const Header = styled.div`
  border-bottom: 1px solid ${colorBorders};
  padding: 0.75em 1rem;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 0.8em;
  line-height: 1;
  margin: 0;
`;

const Body = styled.div`

`;

export default ({selected, type, ...otherProps}) => {
  const Options = {
    answers: AnswerOptions,
    questions: QuestionOptions,
    sections: SectionOptions,
  }[type];
  return (
    <OptionsPanel {...otherProps}>
      <Header>
        <Title>{selected.displayName || selected.title}</Title>
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
              <option.component options={selected} />
            </TabPanel>
          ))}
        </Tabs>
      </Body>
    </OptionsPanel>
  );
};
