import React from "react";
import PropTypes from "prop-types";

import BaseLayout from "layouts/BaseLayout";

const FullPageLayout = props =>
  <BaseLayout hasNav hasBreadcrumbs hasUtilityBtns>
    {props.children}
  </BaseLayout>;

FullPageLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default FullPageLayout;
