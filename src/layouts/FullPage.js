import React from "react";
import PropTypes from "prop-types";

import BaseLayout from "layouts/Base";

const FullPageLayout = props =>
  <BaseLayout hasNav={false} hasBreadcrumbs={false} hasUtilityBtns={false}>
    {props.children}
  </BaseLayout>;

FullPageLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default FullPageLayout;
