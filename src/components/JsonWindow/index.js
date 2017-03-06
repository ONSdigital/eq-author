import React from 'react'
import './style.css'

const JsonWindow = ({question}) => (
  <div className="json-window">
    <pre>{JSON.stringify(question, null, 2)}</pre>
  </div>
)

export default JsonWindow
