import styled from "styled-components";

import iconDelete from "./icon-delete.svg";

import IconButton from "components/IconButton";
import { colors } from "constants/theme";

const IconButtonDelete = styled(IconButton).attrs({
  icon: iconDelete,
  iconOnly: true
})`
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

export default IconButtonDelete;
