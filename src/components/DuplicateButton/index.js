import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import IconCopy from "components/EditorToolbar/icon-copy.svg?inline";
import IconText from "components/IconText";
import Button from "components/Button";

const IconPossiblyWithText = styled(IconText)`
  ${({ withText }) => (!withText ? "padding-right: 0" : "")};
`;

const DuplicateButton = ({ onClick, withText, ...props }) => (
  <Button {...props} onClick={onClick} variant="tertiary" small>
    <IconPossiblyWithText icon={IconCopy}>
      {withText && "Duplicate"}
    </IconPossiblyWithText>
  </Button>
);
DuplicateButton.defaultProps = {
  withText: false
};
DuplicateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  withText: PropTypes.bool
};

export default DuplicateButton;
