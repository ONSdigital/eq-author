import React from "react";
import styled from "styled-components";

import IconDelete from "./icon-delete.svg?inline";
import Button from "components/Button";

import IconText from "components/IconText";

const DeleteButton = styled(Button).attrs({
  variant: "tertiary",
  small: true
})`
  .lid {
    transform-origin: 50% 50%;
    transition: all 200ms ease-out;
  }

  &:focus,
  &:hover {
    .lid {
      transform: translateY(-1px) rotate(6deg);
    }
  }
`;

const IconButtonDelete = props => (
  <DeleteButton {...props}>
    <IconText icon={IconDelete} hideText>
      Delete
    </IconText>
  </DeleteButton>
);

export default IconButtonDelete;
