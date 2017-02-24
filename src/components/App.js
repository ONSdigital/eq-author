import React, { Component } from 'react'
import './App.css'
import QuestionContainer from '../containers/Question.js'
import JsonWindowContainer from '../containers/JsonWindow.js'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="small-4 columns">
            <QuestionContainer />
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
