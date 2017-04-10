import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import AuthorApp from 'components/AuthorApp';

addDecorator((story) => (
  <AuthorApp>{story()}</AuthorApp>
));

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../src/components", true, /\/story\.js$/));
}

configure(loadStories, module);
