import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import IconCopy from "components/EditorToolbar/icon-copy.svg?inline";
import IconText from "components/IconText";
import Button from "components/Button";

const IconPossiblyWithText = styled(IconText)`
  ${({ children }) => (!children ? "padding-right: 0" : "")};
`;

const DuplicateButton = ({ onClick, children, ...props }) => (
  <Button onClick={onClick} variant="tertiary" small {...props}>
    <IconPossiblyWithText icon={IconCopy}>{children}</IconPossiblyWithText>
  </Button>
);

DuplicateButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
};

export default DuplicateButton;
