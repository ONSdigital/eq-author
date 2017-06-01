import React from "react";
import PropTypes from "prop-types";

import BaseLayout from "layouts/Base";

const FullPageLayout = props => (
  <BaseLayout>
    {props.children}
  </BaseLayout>
);

FullPageLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default FullPageLayout;
