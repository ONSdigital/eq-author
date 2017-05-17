import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTreeNodeChildren = styled.div`
  color: white;
  font-size: 1em;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  overflow: hidden;
  height: ${props => (props.open ? "auto" : "0")};
`;

export default class TreeNodeChildren extends Component {
  static defaultProps = {
    open: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  toggleOpen = e => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { children } = this.props;
    return (
      <StyledTreeNodeChildren open={this.state.open}>
        {children}
      </StyledTreeNodeChildren>
    );
  }
}

TreeNodeChildren.propTypes = {
  children: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
}
