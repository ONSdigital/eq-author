import React from 'react'
import PropTypes from 'prop-types'

const Link = ({text, data, onClick}) => (
  <a name={data} onClick={onClick}>{text}</a>
)

Link.propTypes = {
  text: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired
}

export default Link
