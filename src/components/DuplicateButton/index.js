import React from "react";
import PropTypes from "prop-types";

import IconCopy from "components/EditorToolbar/icon-copy.svg?inline";
import IconText from "components/IconText";
import Button from "components/Button";

const DuplicateButton = ({ onClick, children, ...props }) => (
  <Button onClick={onClick} variant="tertiary" small {...props}>
    <IconText icon={IconCopy} hideText={!children}>
      {children || "Duplicate"}
    </IconText>
  </Button>
);

DuplicateButton.defaultProps = {
  hideText: false,
  children: undefined
};

DuplicateButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  hideText: PropTypes.bool
};

export default DuplicateButton;
