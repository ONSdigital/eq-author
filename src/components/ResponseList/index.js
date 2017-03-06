import React from 'react'

import ResponseFields from 'components/ResponseFields'

const ResponseList ({responses, ...other}) => (
  <div className="response-list">
    { this.props.responses.map((response, index) => (
      <ResponseFields key={`response-${index}`}
          response={response}
          responseIndex={index}
          {...other} />
    )) }
  </div>
)
export default ResponseFields
