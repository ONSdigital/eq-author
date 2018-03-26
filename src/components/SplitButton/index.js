import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PrimaryButton from "components/SplitButton/PrimaryButton";
import MenuButton from "components/SplitButton/MenuButton";
import Popout from "components/Popout";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class SplitButton extends React.Component {
  static propTypes = {
    primaryAction: PropTypes.func.isRequired,
    primaryText: PropTypes.string.isRequired,
    onToggleOpen: PropTypes.func.isRequired,
    open: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    open: false
  };

  handleToggleOpen = open => {
    this.props.onToggleOpen(open);
  };

  render() {
    const { primaryAction, primaryText, open, children } = this.props;
    const trigger = <MenuButton />;
    return (
      <FlexContainer>
        <PrimaryButton onClick={primaryAction}>{primaryText}</PrimaryButton>
        <Popout
          trigger={trigger}
          horizontalAlignment="right"
          verticalAlignment="top"
          offsetY="100%"
          onToggleOpen={this.handleToggleOpen}
          open={open}
        >
          {children}
        </Popout>
      </FlexContainer>
    );
  }
}

export default SplitButton;
