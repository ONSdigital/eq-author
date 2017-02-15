import React, { Component } from 'react';
import './App.css';
import QuestionForm from './QuestionForm.js'
import JsonWindow from './JsonWindow.js'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="small-6 columns">
            <QuestionForm />
          </div>
          <div className="small-6 columns">
            <JsonWindow />
          </div>
        </div>
      </div>
    );
  }
}

export default App
