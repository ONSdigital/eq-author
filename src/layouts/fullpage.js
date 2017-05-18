import React from "react";

import BaseLayout from "./base";

const FullPageLayout = (props) =>
  <BaseLayout>
    {props.children}
  </BaseLayout>;

export default FullPageLayout;
