import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes, css } from "styled-components";
import { colors } from "constants/theme";
import savingIcon from "./icon-saving.svg";
import timer from "utils/timer";
import { connect } from "react-redux";
import { isSaving } from "redux/saving/reducer";

const visible = css`
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
`;

const AnimatedSection = styled.div`
  color: ${colors.text};
  display: flex;
  visibility: hidden;
  position: absolute;
  right: 1em;
  top: 1em;
  align-items: center;
  opacity: 0;
  transition: visibility 0s linear 0.5s, opacity 250ms ease-in-out;

  ${props => (props.isSaving || props.timerRunning) && visible};
`;

const rotate360 = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const Icon = styled.img`
  margin-right: 0.5em;
  display: inline-block;
  animation: ${rotate360} 3s linear infinite;
`;

export class UnconnectedSavingIndicator extends React.Component {
  static propTypes = {
    isSaving: PropTypes.bool.isRequired,
    minDisplayTime: PropTypes.number
  };

  static defaultProps = {
    minDisplayTime: 1000
  };

  constructor(props) {
    super(props);
    this.state = {
      timerRunning: false
    };
    this.timer = timer(this.handleClose, this.props.minDisplayTime);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.visible && nextProps.isSaving) {
      return {
        timerRunning: true
      };
    }

    return null;
  }

  handleClose = () => {
    this.setState({
      timerRunning: false
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isSaving && this.props.isSaving) {
      this.timer.start();
    }
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  render() {
    return (
      <AnimatedSection
        isSaving={this.props.isSaving}
        timerRunning={this.state.timerRunning}
        aria-hidden={!(this.props.isSaving || this.state.timerRunning)}
      >
        <Icon src={savingIcon} />
        Saving...
      </AnimatedSection>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSaving: isSaving(state)
  };
};

export default connect(mapStateToProps)(UnconnectedSavingIndicator);
