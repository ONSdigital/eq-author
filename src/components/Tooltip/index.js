import React from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";

const FONT_SIZE = 10;

const StyledTooltip = styled(ReactTooltip)`
    background-color: rgba(97, 97, 97, 0.9) !important;
    font-size: ${FONT_SIZE / 16}em !important;
    line-height: ${22 / FONT_SIZE}em !important;
    padding: 0 ${6 / FONT_SIZE}em !important;
    border-radius: 2px !important;
    white-space: pre;

    &::before, &::after {
      border-bottom: none !important;
      border-top: none !important;
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
        <StyledTooltip
          id={id}
          place="bottom"
          effect="solid"
          delayShow={200}
          {...otherProps}
        >
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
