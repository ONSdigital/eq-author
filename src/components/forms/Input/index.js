import React from 'react'

const Input = ({value, type, ...other}) => (
  <input type={type || "text"} defaultValue={value} {...other} />
)

export default Input
