import React from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTooltip = styled(ReactTooltip)`
    background-color: #707070 !important;
    &::after {
      border-bottom: none !important;
    }
`;

const Tooltip = ({ tooltipText, tooltipId, children, ...props }) => {
  const childrenWithTooltip = React.Children.map(children, (child, id) =>
    React.cloneElement(child, {
      "data-tip": true,
      "data-for": `${tooltipId}`
    })
  );

  return (
    <div>
      {childrenWithTooltip}
      <StyledTooltip id={tooltipId} place="bottom" effect="solid" {...props}>
        <span>
          {tooltipText}
        </span>
      </StyledTooltip>
    </div>
  );
};

Tooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  tooltipId: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default Tooltip;
