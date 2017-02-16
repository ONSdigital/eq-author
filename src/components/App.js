import React, { Component } from 'react'
import './App.css'
import QuestionFormContainer from '../containers/QuestionForm.js'
import JsonWindowContainer from '../containers/JsonWindow.js'

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
