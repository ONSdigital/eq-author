import React from 'react'

const Input = ({value, ...other}) => (
  <input type="text" defaultValue={value} {...other} />
)

export default Input
