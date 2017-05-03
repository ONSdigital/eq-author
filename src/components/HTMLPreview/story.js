import React from 'react'
import { storiesOf } from '@kadira/storybook'
import HTMLPreview from 'components/HTMLPreview'
import surveyData from 'components/HTMLPreview/story-data'

storiesOf('HTMLPreview', module)
  .add('Default', () => (
    <HTMLPreview survey={surveyData.survey}>
    </HTMLPreview>
  ))
