import React from "react";
import { withRouter } from "react-router-dom";

import { isOnPage, isOnSection } from "utils/UrlUtils";

import PreviewPageRoute from "components/PreviewPageRoute";
import PreviewSectionRoute from "components/PreviewSectionRoute";

const PreviewRoute = props => {
  if (isOnPage(props.match)) {
    return <PreviewPageRoute {...props} />;
  }
  if (isOnSection(props.match)) {
    return <PreviewSectionRoute {...props} />;
  }
};

export default withRouter(PreviewRoute);
