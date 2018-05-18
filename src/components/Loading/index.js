import React from "react";
import Icon from "./icon-loading.svg?inline";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const colorChange = keyframes`
  from {
     fill: #ccc;
  }
  
  to {
    fill: #3B7A9E;
  }
`;

const Container = styled(({ height, ...props }) => <div {...props} />)`
  height: ${props => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Message = styled.p`
  font-weight: bold;
  font-size: 1.125em;
  margin: 0;
`;

const StyledIcon = styled(Icon)`
  margin-bottom: 1em;

  .block {
    fill: #ccc;
    animation: ${colorChange} 1s ease-in infinite alternate;
  }
`;

class Delay extends React.Component {
  static propTypes = {
    delay: PropTypes.number,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    delay: 250
  };

  state = {
    ready: false
  };

  componentDidMount() {
    this.timer = setTimeout(
      () => this.setState({ ready: true }),
      this.props.delay
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.state.ready ? this.props.children : null;
  }
}

const Loading = ({ children, height }) => (
  <Container height={height}>
    <Delay>
      <StyledIcon />
      <Message>{children}</Message>
    </Delay>
  </Container>
);

Loading.propTypes = {
  children: PropTypes.string.isRequired,
  height: PropTypes.string
};

Loading.defaultProps = {
  height: "auto"
};

export default Loading;
