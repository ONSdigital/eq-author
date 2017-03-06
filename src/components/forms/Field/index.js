import React, { Children, cloneElement } from 'react'

const Field = ({children, ...otherProps}) => (
  <div className="field">
    {Children.map(children, child => cloneElement(child, otherProps))}
  </div>
)

export default Field
