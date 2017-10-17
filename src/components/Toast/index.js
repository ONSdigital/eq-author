import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";
import { transparentize } from "polished";

const bgColor = transparentize(0.1, colors.darkGrey);

const StyledToast = styled.div`
  background-color: ${bgColor};
  padding: 1em;
  color: ${colors.white};
  font-size: 0.875rem;
  width: auto;
`;

export default class Toast extends React.Component {
  static propTypes = {
    timeout: PropTypes.number,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
    id: PropTypes.any.isRequired // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    timeout: 0
  };

  constructor(props) {
    super(props);

    if (props.timeout) {
      this.timer = setTimeout(this.handleClose, props.timeout);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClose = () => {
    this.props.onClose(this.props.id);
  };

  render() {
    const { children, onClose, ...otherProps } = this.props;
    const child = React.Children.only(children);

    return (
      <StyledToast {...otherProps}>
        {React.cloneElement(child, { onClose: this.handleClose })}
      </StyledToast>
    );
  }
}
