import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import App from "components/App";

addDecorator(story => <App>{story()}</App>);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../src/components", true, /[/.]story\.js$/));
}

setOptions({
  name: "My Storybook",
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: true
});

configure(loadStories, module);
