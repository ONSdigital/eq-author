import React, {Component} from 'react';
import sections from './reducer';
import {TreeMenu} from 'components/TreeMenu';

export default class TreeMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: props.sections,
    };
  }

  dispatch = action => {
    this.setState(prevState => sections(prevState, action));
  };

  actions = {
    addSection: name => {
      this.dispatch({
        type: 'ADD_SECTION',
        payload: {
          name: name,
        },
      });
    },
    addQuestion: (name, sectionID) => {
      this.dispatch({
        type: 'ADD_QUESTION',
        payload: {
          name: name,
          sectionID: sectionID,
        },
      });
    },
    addAnswer: (name, questionID, sectionID) => {
      this.dispatch({
        type: 'ADD_ANSWER',
        payload: {
          name: name,
          questionID: questionID,
          sectionID: sectionID,
        },
      });
    },
  };

  render() {
    return <TreeMenu sections={this.state.sections} {...this.actions} />;
  }
}
