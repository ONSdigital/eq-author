import React from 'react';
import './style.css';
import QuestionFormContainer from 'containers/QuestionForm';
import JsonWindowContainer from 'containers/JsonWindow';
import HTMLPreviewContainer from 'containers/HTMLPreview';
import {Tabs, TabPanel, TabList, TabTitle} from 'components/Tabs';

const App = () => (
  <div className="app">
    <div className="row">
      <div className="small-4 columns">
        <QuestionFormContainer />
      </div>
      <div className="small-8 columns">
        <Tabs>
          <TabList>
            <TabTitle>JSON</TabTitle>
            <TabTitle>Preview</TabTitle>
          </TabList>
          <TabPanel>
            <JsonWindowContainer />
          </TabPanel>
          <TabPanel>
            <div>
              <HTMLPreviewContainer />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  </div>
)

export default App
