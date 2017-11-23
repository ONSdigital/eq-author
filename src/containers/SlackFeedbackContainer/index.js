import React from "react";

import SlackFeedback from "react-slack-feedback";

class SlackFeedbackContainer extends React.Component {
  render() {
    return (
      <SlackFeedback channel="eq-author" onSubmit={this.handleSendMessage} />
    );
  }

  handleSendMessage(payload) {
    console.log("payload: ", payload);
    console.log(this);
    try {
      this.sent();
    } catch (e) {
      console.log(e);
    }
  }
}

export default SlackFeedbackContainer;
