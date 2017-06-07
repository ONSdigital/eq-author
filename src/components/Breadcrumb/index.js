import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";
import Chevron from "./chevron";

const BreadcrumbLinkPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object
]);

const ChevronIcon = styled(Chevron)`
  margin: 0 0.5em 0 0.5em;
`;

const StyledBreadcrumb = styled.div`
  font-size: 16px;
  padding: 16px;
  a {
    text-decoration: none;
    color: ${colors.text}
  }
`;

const BreadcrumbLink = props => (
  <span>
    {props.link}
    {!props.isLast && <Chevron />}
  </span>
);

BreadcrumbLink.propTypes = {
  link: BreadcrumbLinkPropType,
  isLast: PropTypes.bool
};

BreadcrumbLink.defaultProps = {
  isLast: false
};

BreadcrumbLink.propTypes = {
  link: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  isLast: PropTypes.bool
};

const Breadcrumb = props => (
  <StyledBreadcrumb {...props}>
    {props.links.map((link, index) => (
      <BreadcrumbLink
        key={index}
        link={link}
        isLast={index === props.links.length - 1}
      />
    ))}
  </StyledBreadcrumb>
);

Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(BreadcrumbLinkPropType).isRequired
};

export default Breadcrumb;
