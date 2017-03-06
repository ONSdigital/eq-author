import React from 'react'

const TextArea = ({value, ...other}) => (
  <textarea defaultValue={value} {...other}></textarea>
)

export default TextArea
