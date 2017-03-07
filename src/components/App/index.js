import React from 'react'
import styled from 'styled-components'

import QuestionContainer from 'containers/Question'
import AnswersContainer from 'containers/Answers'
import JsonWindowContainer from 'containers/JsonWindow'
import HTMLPreviewContainer from 'containers/HTMLPreview'
import {Tabs, TabPanel, TabList, TabTitle} from 'components/Tabs'
import TopBar from 'components/TopBar'

const Wrapper = styled.div`
  padding: 1rem;
`;

const App = () => (
  <div>
    <TopBar />
    <Wrapper className="app">
      <div className="row">
        <div className="small-4 columns">
          <form>
            <Tabs>
              <TabList>
                <TabTitle>Question</TabTitle>
                <TabTitle>Answers</TabTitle>
              </TabList>
              <TabPanel>
                <QuestionContainer />
              </TabPanel>
              <TabPanel>
                <AnswersContainer />
              </TabPanel>
            </Tabs>
          </form>
        </div>
        <div className="small-8 columns">
          <Tabs>
            <TabList>
              <TabTitle>Preview</TabTitle>
              <TabTitle>JSON</TabTitle>
            </TabList>
            <TabPanel>
              <HTMLPreviewContainer />
            </TabPanel>
            <TabPanel>
              <JsonWindowContainer />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Wrapper>
  </div>
)

export default App
