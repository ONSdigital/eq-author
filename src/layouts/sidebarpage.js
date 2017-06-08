import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BaseLayout from "./base";
import Breadcrumb from "components/Breadcrumb";
import Nav from "components/Nav";
import SurveySidebar from "containers/SurveySidebar";
import { Grid, Column } from "components/Grid";

const Links = [
  <Link to="/" key="home">Survey Home</Link>,
  <Link to="/create" key="create">Create Survey</Link>,
  "Design"
];

const SidebarPageLayout = props => {
  return (
    <BaseLayout>
      <Nav />
      <Breadcrumb links={Links} />
      <Grid>
        <Column cols="3" gutters={false}>
          <SurveySidebar />
        </Column>
        <Column gutters={false}>
          {props.children}
        </Column>
      </Grid>
    </BaseLayout>
  );
};

SidebarPageLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default SidebarPageLayout;
