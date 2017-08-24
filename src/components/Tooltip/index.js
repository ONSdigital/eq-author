import React from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";

const StyledTooltip = styled(ReactTooltip)`
    background-color: #707070 !important;
    &::before, &::after {
      border-bottom: none !important;
    }
`;

class Tooltip extends React.Component {
  getGeneratedId() {
    return this.id || (this.id = uniqueId("tooltip-"));
  }

  render() {
    const { children, content, ...otherProps } = this.props;
    const child = React.Children.only(children);
    const id = child.props.id || this.getGeneratedId();

    return (
      <div>
        {React.cloneElement(child, {
          "data-tip": true,
          "data-for": id
        })}
        <StyledTooltip id={id} place="bottom" effect="solid" {...otherProps}>
          {content}
        </StyledTooltip>
      </div>
    );
  }
}

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.element.isRequired
};

export default Tooltip;
