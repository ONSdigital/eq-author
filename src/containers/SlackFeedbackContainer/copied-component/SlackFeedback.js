import React, { Component } from "react";
import PropTypes from "prop-types";

// classnames
import classNames from "classnames";

// Images
// import SlackIcon from './SlackIcon';
import "./SlackFeedback.scss";

const propTypes = {
  channel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func,
  sending: PropTypes.bool,
  user: PropTypes.string,
  disabled: PropTypes.bool,
  emoji: PropTypes.string,
  buttonText: PropTypes.node,
  imageUploadText: PropTypes.string,
  triggerStyles: PropTypes.object,
  contentStyles: PropTypes.object,
  showChannel: PropTypes.bool,
  title: PropTypes.node
};

const defaultProps = {
  sending: false,
  user: "Unknown User",
  disabled: false,
  emoji: ":speaking_head_in_silhouette:",
  buttonText: "Tell us something",
  disableImageUpload: false,
  imageUploadText: "Attach Image",
  triggerStyles: {},
  contentStyles: {},
  showChannel: true,
  title: <span>Tell us something...</span>
};

const types = [
  { value: "bug", label: "Bug" },
  { value: "improvement", label: "Improvement" },
  { value: "feature", label: "Feature Request" }
];

class SlackFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      sendURL: true,
      sent: false,
      error: false,
      uploadingImage: false,
      selectedType: "Bug",
      image: {}
    };

    // Bind event handlers once to avoid performance issues with re-binding
    // on every render
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleToggleSendURL = this.handleToggleSendURL.bind(this);
    this.handleSelectType = this.handleSelectType.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    if (this.state.active) {
      this.handleClose();
    } else {
      this.activate();
    }
  }

  activate() {
    this.setState({
      active: !this.state.active
    });

    document.addEventListener("click", this.handleClickOutside.bind(this));
  }

  handleClickOutside(event) {
    if (event.defaultPrevented) {
      return;
    }

    if (!this.SlackFeedback.contains(event.target)) {
      this.handleClose();
    }
  }

  handleClose() {
    this.setState({
      active: false
    });

    document.removeEventListener("click", this.handleClickOutside.bind(this));
  }

  handleToggleSendURL() {
    this.setState({
      sendURL: !this.state.sendURL
    });
  }

  handleSelectType(e) {
    this.setState({
      selectedType: e.target.innerText
    });
  }

  sent() {
    this.setState(
      {
        sending: false,
        sent: true,
        image: {},
        error: false
      },
      () => {
        this.message.value = "";
        setTimeout(() => {
          this.setState({ sent: false });
        }, 5 * 1000);
      }
    );
  }

  error(err) {
    this.setState(
      {
        sending: false,
        error: this.determineErrorType(err)
      },
      () => {
        setTimeout(() => {
          this.setState({ error: null });
        }, 8 * 1000);
      }
    );
  }

  determineErrorType(err) {
    if (!err || typeof err !== "string") {
      return "Unexpected Error!";
    }

    switch (err.status) {
      case 400:
        return "Bad Request!";
      case 403:
        return "Forbidden!";
      case 404:
        return "Channel Not Found!";
      case 410:
        return "Channel is Archived!";
      case 500:
        return "Server Error!";
      default:
        return "Unexpected Error!";
    }
  }

  handleSend() {
    var { selectedType, sendURL, image } = this.state;
    var message = this.message.value;
    var level;

    this.setState({
      sending: true
    });

    // Attach the curent URL
    if (sendURL) {
      message += `\n <${document.location.href}>`;
    }

    // Slack accepts 3 color levels: danger (red), good (green) and warning (orange)
    switch (selectedType) {
      case "Bug":
        level = "danger";
        break;
      case "Feature":
        level = "good";
        break;
      case "Improvement":
        level = "warning";
        break;
    }

    var payload = {
      channel: this.props.channel,
      username: this.props.user,
      icon_emoji: this.props.emoji,
      attachments: [
        {
          fallback: `Feedback (${selectedType})`,
          author_name: this.props.user,
          color: level,
          title: selectedType,
          title_link: document.location.href,
          text: message,
          footer: "React Slack Feedback"
        }
      ]
    };

    // Attach the image (if available)
    if (image.url) {
      payload.attachments[0].imageUrl = image.url;
    }

    // Submit the payload
    this.props.onSubmit.call(this, payload);
  }

  attachImage(event) {
    var { files } = event.target;

    var file = files[0];
    file.preview = window.URL.createObjectURL(file);

    this.setState(
      {
        image: file,
        uploadingImage: true
      },
      () => {
        this.props.onImageUpload.call(this, file);
      }
    );
  }

  uploadError(err) {
    this.setState(
      {
        uploading: false,
        error: "Error Uploading Image!"
      },
      () => {
        this.handleRemoveImage();

        setTimeout(() => {
          this.setState({ error: null });
        }, 6 * 1000);
      }
    );
  }

  imageUploaded(url) {
    if (typeof url !== "string") {
      console.error(
        "[SlackFeedback] `url` argument in `imageUploaded` method must be a string"
      );
      this.handleRemoveImage();
      return;
    }

    // Merge the image URL with the file object,
    // the resulting object will contain only the preview and the URL.
    // Any file information will be lost
    var image = { ...this.state.image, url };

    this.setState({
      uploadingImage: false,
      image
    });
  }

  renderImageUpload() {
    if (this.state.image.preview) {
      return this.renderImagePreview();
    }

    return (
      <div className="SlackFeedback-image-upload">
        <label
          className="SlackFeedback-image-upload-button"
          htmlFor="imageUpload"
        >
          {this.props.imageUploadText}
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={event => this.attachImage(event)}
        />
      </div>
    );
  }

  handleRemoveImage(event) {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      image: {},
      uploadingImage: false
    });
  }

  renderImagePreview() {
    var { image, uploadingImage } = this.state;

    if (!image.preview) {
      return null;
    }

    return (
      <div
        className="SlackFeedback--image-preview"
        style={{
          backgroundImage: `url(${image.preview})`
        }}
      >
        {uploadingImage ? (
          <div className="SlackFeedback--loader" />
        ) : (
          <div className="SlackFeedback--preview-overlay">
            <span onClick={this.handleRemoveImage}>Remove</span>
          </div>
        )}
      </div>
    );
  }

  render() {
    var {
      active,
      sending,
      sent,
      error,
      image,
      sendURL,
      selectedType,
      uploadingImage
    } = this.state;

    var submitText = "Send Feedback";

    if (sent) {
      submitText = "Sent!";
    }
    if (sending && !sent) {
      submitText = "Sending Feedback...";
    }
    if (error) {
      submitText = error;
    }

    // Return nothing if the component has been disabled
    if (this.props.disabled) {
      return null;
    }

    return (
      <div
        ref={ref => {
          this.SlackFeedback = ref;
        }}
        id="SlackFeedback"
        className={classNames("SlackFeedback", { active })}
      >
        <div
          ref={ref => {
            this.container = ref;
          }}
          style={this.props.contentStyles}
          className="SlackFeedback--container fadeInUp"
        >
          <div className="SlackFeedback--header">
            {this.props.title}
            <div className="close" onClick={this.handleClose}>
              close
            </div>
          </div>

          <div className="SlackFeedback--content">
            {this.props.showChannel && (
              <label className="SlackFeedback--label">Channel</label>
            )}
            <input
              className="SlackFeedback--input"
              value={this.props.channel}
              disabled
              hidden={!this.props.showChannel}
            />

            <label className="SlackFeedback--label">Feedback Type</label>
            <ul className="SlackFeedback--tabs">
              <li
                onClick={this.handleSelectType}
                className={classNames({
                  selected: selectedType === "Bug"
                })}
              >
                Bug
              </li>
              <li
                onClick={this.handleSelectType}
                className={classNames({
                  selected: selectedType === "Feature"
                })}
              >
                Feature
              </li>
              <li
                onClick={this.handleSelectType}
                className={classNames({
                  selected: selectedType === "Improvement"
                })}
              >
                Improvement
              </li>
            </ul>

            <label className="SlackFeedback--label">Your Message</label>
            <textarea
              ref={ref => {
                this.message = ref;
              }}
              className="SlackFeedback--textarea"
              placeholder="Message..."
            />

            {/* Only render the image upload if there's callback available  */}
            {this.props.onImageUpload ? this.renderImageUpload() : null}

            <div style={{ padding: "0.5em 0 1em" }}>
              <input
                id="sendURL"
                className="SlackFeedback--checkbox"
                type="checkbox"
                checked={sendURL}
                onChange={this.handleToggleSendURL}
              />
              <label
                htmlFor="sendURL"
                className="SlackFeedback--checkbox-label"
              >
                Send URL with Feedback
              </label>
            </div>

            <button
              className={classNames("submit", {
                sent,
                error,
                disabled: sending || uploadingImage
              })}
              onClick={this.handleSend}
            >
              {submitText}
            </button>
          </div>
        </div>

        <div
          style={this.props.triggerStyles}
          className={classNames("SlackFeedback--trigger", { active })}
          onClick={this.handleToggle}
        >
          {this.props.buttonText}
        </div>
      </div>
    );
  }
}

SlackFeedback.propTypes = propTypes;
SlackFeedback.defaultProps = defaultProps;

export default SlackFeedback;
