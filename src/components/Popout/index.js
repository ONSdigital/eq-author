/* eslint-disable react/no-find-dom-node */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import uncontrollable from "uncontrollable";

const ESC_KEY_CODE = 27;

const Container = styled.div`position: relative;`;

const Layer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

class Popout extends React.Component {
  static propTypes = {
    trigger: PropTypes.element,
    children: PropTypes.node,
    open: PropTypes.bool,
    onToggleOpen: PropTypes.func
  };

  static defaultProps = {
    open: false
  };

  bindRootCloseHandlers() {
    document.addEventListener("click", this.handleDocumentClick);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  unbindRootCloseHandlers() {
    document.removeEventListener("click", this.handleDocumentClick);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  componentWillMount() {
    this.bindRootCloseHandlers();
  }

  componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }

  handleKeyUp = e => {
    if (e.keyCode === ESC_KEY_CODE) {
      this.props.onToggleOpen(false);
    }
  };

  handleDocumentClick = e => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.props.onToggleOpen(false);
    }
  };

  handleTriggerClick = e => {
    this.props.onToggleOpen(true);
  };

  renderLayer() {
    if (!this.props.open) {
      return null;
    }

    return (
      <Layer>
        {this.props.children}
      </Layer>
    );
  }

  render() {
    const trigger = React.cloneElement(this.props.trigger, {
      onClick: this.handleTriggerClick,
      "aria-haspopup": true,
      "aria-expanded": this.props.open
    });

    return (
      <Container>
        {trigger}
        {this.renderLayer()}
      </Container>
    );
  }
}

export default Popout;
export const UncontrolledPopout = uncontrollable(Popout, {
  open: "onToggleOpen"
});
