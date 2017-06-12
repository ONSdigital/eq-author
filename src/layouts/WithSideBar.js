import React from "react";
import PropTypes from "prop-types";

import BaseLayout from "layouts/Base";

import SurveySidebar from "containers/SurveySidebar";
import { Grid, Column } from "components/Grid";

const SidebarPageLayout = props =>
  <BaseLayout>
    <Grid align="top">
      <Column cols={3} gutters={false}>
        <SurveySidebar />
      </Column>
      <Column gutters={false}>
        {props.children}
      </Column>
    </Grid>
  </BaseLayout>;

SidebarPageLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default SidebarPageLayout;
