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

const Breadcrumb = props => {
  return (
    <BreadcrumbNav aria-label="breadcrumb">
      <BreadcrumbList>
        {props.breadcrumbs.map(({ title, pathname }, index) =>
          <BreadcrumbItem key={pathname}>
            <BreadcrumbLink to={pathname}>{title}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired
    })
  ).isRequired
};

Breadcrumb.defaultProps = {
  breadcrumbs: []
};

export default Breadcrumb;
