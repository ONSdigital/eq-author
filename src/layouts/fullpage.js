import React from "react";
import PropTypes from "prop-types";

import BaseLayout from "./base";

const FullPageLayout = props => (
  <BaseLayout>
    {props.children}
  </BaseLayout>
);

FullPageLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default FullPageLayout;
