import React, { Component } from 'react'
import './style.css'
import QuestionFormContainer from 'containers/QuestionForm'
import JsonWindowContainer from 'containers/JsonWindow'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="small-4 columns">
            <QuestionFormContainer />
          </div>
          <div className="small-8 columns">
            <JsonWindowContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default App
