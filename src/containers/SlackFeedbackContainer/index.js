import React from "react";

import "whatwg-fetch";

import SlackFeedback from "react-slack-feedback";
// import SlackFeedback from "./copied-component/SlackFeedback";

let slackUrl = process.env.NODE_ENV === "production"
    ? "https://eq-author-server2.herokuapp.com/api/slack"
    : "http://localhost:8050/api/slack";

class SlackFeedbackContainer extends React.Component {
  render() {
    return (
      <SlackFeedback
        channel="eq-author-feedback"
        onSubmit={this.handleSendMessage}
        buttonText="Tell us something"
        title="Tell us something..."
        showChannel={false}
      />
    );
  }

  handleSendMessage(payload) {
    console.log("payload: ", payload);
    console.log(this);

    var data = payload;

    data.attachments[0].text = data.attachments[0].text.replace(
      "<" + data.attachments[0].title_link + ">",
      ""
    );

    fetch(slackUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      // body: new FormData(form)
    }).then(res => {
      console.log(res);
    });

    try {
      this.sent();
    } catch (e) {
      console.log(e);
    }
  }
}

export default SlackFeedbackContainer;
