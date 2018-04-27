import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

const IconButtonDelete = ({ hideText, ...otherProps }) => (
  <DeleteButton {...otherProps}>
    <IconText icon={IconDelete} hideText={hideText}>
      Delete
    </IconText>
  </DeleteButton>
);

IconButtonDelete.propTypes = {
  hideText: PropTypes.bool
};

IconButtonDelete.defaultProps = {
  hideText: false
};

export default IconButtonDelete;
