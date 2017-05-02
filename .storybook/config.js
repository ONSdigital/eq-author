import React from 'react';
import {configure, addDecorator} from '@kadira/storybook';
import App from 'components/App';

addDecorator(story => <App>{story()}</App>);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('../src/components', true, /\/story\.js$/));
}

configure(loadStories, module);
