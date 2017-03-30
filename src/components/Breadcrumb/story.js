import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Breadcrumb from 'components/Breadcrumb'

// This will be replaced by React-Router links
const Link = (props) => (
  <a href="#">{props.text}</a>
)

const links = [<Link text="Hello" />, <Link text="World" />]

storiesOf('Breadcrumb', module)
  .add('Default', () => (
    <Breadcrumb links={links} />
  ))
