import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "layouts/Base";
import QuestionnaireSidebar from "containers/QuestionnaireSidebar";
import { Grid, Column } from "components/Grid";

const SidebarPageLayout = props =>
  <BaseLayout hasNav hasBreadcrumbs hasUtilityBtns>
    <Grid align="top">
      <Column cols={3} gutters={false}>
        <QuestionnaireSidebar />
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
