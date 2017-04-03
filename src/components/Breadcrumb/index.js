import React from 'react'
import styled from 'styled-components'
import {colorGrey} from 'constants/theme'
import Chevron from './chevron'

const ChevronIcon = styled(Chevron)`
  margin: 0 0.5em 0 0.5em;
`

const Breadcrumb = styled.div`
  background-color: ${colorGrey};
  font-size: 0.8em;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  padding: 0.5em 1em;
`

Breadcrumb.propTypes = {
  links: React.PropTypes.array.isRequired
}

const BreadcrumbLink = (props) => (
  <span>
    {props.link}
    {!props.isLast &&
      <ChevronIcon />
    }
  </span>
)

BreadcrumbLink.propTypes = {
  link: React.PropTypes.object,
  isLast: React.PropTypes.bool
}

BreadcrumbLink.defaultProps = {
  isLast: false
}

export default (props) =>
  <Breadcrumb {...props}>
    {props.links.map( (link, index) => (
      <BreadcrumbLink key={index} link={link} isLast={index === props.links.length - 1} />
    ))}
  </Breadcrumb>
