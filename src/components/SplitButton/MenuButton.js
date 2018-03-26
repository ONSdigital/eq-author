import React from "react";
import styled from "styled-components";
import Chevron from "./chevron.svg?inline";
import { colors } from "constants/theme";
import IconButton from "components/IconButton";

const StyledChevron = styled(Chevron)`
  height: 1em;
  path {
    stroke: ${colors.blue};
  }
`;

const StyledIconButton = styled(IconButton)`
  background: ${colors.white};
  border: 1px solid ${colors.blue};
  color: ${colors.blue};
  border-radius: 0 4px 4px 0;
  flex: 0;
  padding: 0.7em 1em;

  &:focus {
    color: ${colors.white};
    background-color: ${colors.blue};
    outline: 0;
  }

  &:focus ${StyledChevron} path {
    stroke: ${colors.white};
  }

  &:hover ${StyledChevron} path {
    fill: none;
  }
`;

// Trigger needs to be a class component since the Popout manages
// a Ref and this cannot be achieved with a stateless Trigger component.
class MenuButton extends React.Component {
  render() {
    return (
      <StyledIconButton icon={StyledChevron} iconOnly {...this.props}>
        Show additional options
      </StyledIconButton>
    );
  }
}

export default MenuButton;
