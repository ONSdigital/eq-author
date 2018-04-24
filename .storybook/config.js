import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import App from "components/App";
import { Provider } from "react-redux";
import configureStore from "redux/configureStore";

addDecorator(story => <App>{story()}</App>);

addDecorator(story => (
  <Provider store={configureStore(null, null, {})}>{story()}</Provider>
));

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
