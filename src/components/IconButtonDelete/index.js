import React from "react";
import styled from "styled-components";

import IconDelete from "./icon-delete.svg?inline";

import IconButton from "components/IconButton";
import { colors } from "constants/theme";

const StyledIconButton = styled(IconButton)`
  background: none;
  border: none;
  padding: 0.25rem;
  margin: 0;

  .lid {
    transform-origin: 50% 50%;
    transition: all 200ms ease-out;
  }

  &:focus,
  &:hover {
    outline: none;

    .lid {
      transform: translateY(-1px) rotate(6deg);
    }

    .lid,
    .body {
      fill: ${colors.blue};
    }
  }
`;

const IconButtonDelete = props => (
  <StyledIconButton icon={IconDelete} iconOnly {...props}>
    Delete
  </StyledIconButton>
);

export default IconButtonDelete;
