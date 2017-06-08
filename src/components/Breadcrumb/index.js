import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";
import Chevron from "./chevron";

const BreadcrumbLinkPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object
]);

const BreadcrumbLink = props =>
  <span>
    {props.children}
    {!props.isLast && <Chevron />}
  </span>;

BreadcrumbLink.propTypes = {
  children: BreadcrumbLinkPropType.isRequired,
  isLast: PropTypes.bool
};

BreadcrumbLink.defaultProps = {
  isLast: false
};

const StyledBreadcrumb = styled.div`
  padding: 1em 1em;
  a {
    text-decoration: none;
    color: ${colors.text};
  }
`;

const Breadcrumb = props =>
  <StyledBreadcrumb>
    {props.children.map((child, index) =>
      <BreadcrumbLink key={index} isLast={index === props.children.length - 1}>
        {child}
      </BreadcrumbLink>
    )}
  </StyledBreadcrumb>;

Breadcrumb.propTypes = {
  children: PropTypes.arrayOf(BreadcrumbLinkPropType).isRequired
};

export default Breadcrumb;
