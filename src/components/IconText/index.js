import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import VisuallyHidden from "components/VisuallyHidden";

const IconWithText = styled.span`
  display: flex;
  align-items: center;
  padding-right: ${props => (props.hideText ? 0 : "0.5em")};
  line-height: 1.3;
  color: var(--color-text);

  svg {
    pointer-events: none;
    path {
      fill: var(--color-text);
    }
  }
`;

const IconText = ({ icon: Icon, hideText, children }) => (
  <IconWithText hideText={hideText}>
    <Icon />
    {hideText ? <VisuallyHidden>{children}</VisuallyHidden> : children}
  </IconWithText>
);

IconText.propTypes = {
  icon: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  hideText: PropTypes.bool
};

IconText.defaultProps = {
  hideText: false
};

export default IconText;
