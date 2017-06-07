import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "constants/theme";
import iconChevron from "./chevron.svg";

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

const StyledBreadcrumb = styled.nav`
  a {
    text-decoration: none;
    color: ${colors.white};
    padding: 0;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Breadcrumb = ({ breadcrumbs }) =>
  <StyledBreadcrumb>
    <BreadcrumbList>
      {breadcrumbs &&
        breadcrumbs.map(({ title, path }, index) =>
          <BreadcrumbItem key={path}>
            <Link to={path}>{title}</Link>
          </BreadcrumbItem>
        )}
    </BreadcrumbList>
  </StyledBreadcrumb>;

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Breadcrumb;
