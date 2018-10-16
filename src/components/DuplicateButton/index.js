import React from "react";
import PropTypes from "prop-types";

import IconCopy from "components/EditorToolbar/icon-copy.svg?inline";
import IconText from "components/IconText";
import Button from "components/Button";

const DuplicateButton = ({ onClick, ...props }) => (
  <Button {...props} onClick={onClick} variant="tertiary" small>
    <IconText icon={IconCopy}>Duplicate</IconText>
  </Button>
);
DuplicateButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DuplicateButton;
