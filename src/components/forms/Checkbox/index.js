import React from 'react'

const Checkbox = (props) => (
  <input type="checkbox" checked={props.checked} {...props} />
)

export default Checkbox
