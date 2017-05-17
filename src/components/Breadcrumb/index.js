import React from "react";
import styled from "styled-components";
import { colorGrey } from "constants/theme";
import Chevron from "./chevron";

const BreadcrumbLinkPropType = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.object
]);

const ChevronIcon = styled(Chevron)`
  margin: 0 0.5em 0 0.5em;
`;

const Breadcrumb = styled.div`
  background-color: ${colorGrey};
  font-size: 0.7em;
  display: flex;
  align-items: center;
  padding: 1em 1em;
  a {
    text-decoration: none;
    color: ${props => props.theme.colorText}
  }
`;

Breadcrumb.propTypes = {
  links: React.PropTypes.arrayOf(BreadcrumbLinkPropType).isRequired
};

const BreadcrumbLink = (props) => (
  <span>
    {props.link}
    {!props.isLast &&
      <ChevronIcon />
    }
  </span>
);

BreadcrumbLink.propTypes = {
  link: BreadcrumbLinkPropType,
  isLast: React.PropTypes.bool
};

BreadcrumbLink.defaultProps = {
  isLast: false
};

export default (props) => (
  <Breadcrumb {...props}>
    {props.links.map((link, index) => (
      <BreadcrumbLink key={index} link={link} isLast={index === props.links.length - 1} />
    ))}
  </Breadcrumb>
);
