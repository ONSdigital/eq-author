import React from "react";
import { Router } from "react-router";
import createMemoryHistory from "history/createMemoryHistory";
import { configure, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { setOptions } from "@storybook/addon-options";

import App from "components/App";

const history = createMemoryHistory();

history.push = action("history.push");
history.replace = action("history.replace");
history.go = action("history.go");
history.goBack = action("history.goBack");
history.goForward = action("history.goForward");

addDecorator(story =>
  <Router history={history}>
    <App>
      {story()}
    </App>
  </Router>
);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("components", true, /[/.]story\.js$/));
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
