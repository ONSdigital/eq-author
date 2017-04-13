import React from 'react'

import { withRouter } from 'react-router-dom'

import Button from 'components/Button'

const LinkButton = withRouter(({history, to, children, ...otherProps}) =>
  <Button {...otherProps} onClick={() => history.push(to) }>
    {children}
  </Button>
)

export default LinkButton
