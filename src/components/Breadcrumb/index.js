import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "constants/theme";
import iconChevron from "./chevron.svg";
import CustomPropType from "custom-prop-types";

const BreadcrumbList = styled.ol`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const BreadcrumbItem = styled.li`
  margin: 0;
  &:last-child:not(:only-child) {
    &:before {
      margin: 0 0.5em;
      content: url('${iconChevron}');
    }
  }
`;

const BreadcrumbNav = styled.nav`
  display: block;
`;

export const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: ${colors.white};
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const Breadcrumb = ({ breadcrumb }) => {
  return (
    <BreadcrumbNav aria-label="breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to={"/"}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink to={breadcrumb.path}>
            {breadcrumb.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

Breadcrumb.propTypes = {
  breadcrumb: CustomPropType.breadcrumb
};

export default Breadcrumb;
