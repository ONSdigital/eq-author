import React from "react";
import styled from "styled-components";
import { colorGrey } from "constants/theme";
import Chevron from "./chevron";

const ChevronIcon = styled(Chevron)`
  margin: 0 0.5em 0 0.5em;
`;

const StyledBreadcrumb = styled.div`
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

const BreadcrumbLink = props => (
  <span>
    {props.link}
    {!props.isLast && <ChevronIcon />}
  </span>
);

BreadcrumbLink.defaultProps = {
  isLast: false
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

export default Breadcrumb;
