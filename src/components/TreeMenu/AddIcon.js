import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  width: 1em;
  height: 1em;
  position: relative;
  opacity: 0.2;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
`

export default (props) =>
  <Icon {...props}>
    <svg width="11px" height="11px" viewBox="180 16 11 11" version="1.1">
      <path d="M185.501279,20.5262273 L185.501279,16.4736198 C185.501279,16.211959 185.288101,16 185.025126,16 C184.76215,16 184.548972,16.211959 184.548972,16.4736198 L184.548972,20.5262273 L180.476,20.5262273 C180.213024,20.5262273 180,20.7383392 180,21 C180,21.2616608 180.213024,21.4737727 180.476,21.4737727 L184.548972,21.4737727 L184.548972,25.5263802 C184.548972,25.788041 184.76215,26 185.025126,26 C185.288101,26 185.501279,25.788041 185.501279,25.5263802 L185.501279,21.4737727 L189.574251,21.4737727 C189.837227,21.4737727 190.050251,21.2616608 190.050251,21 C190.050251,20.7383392 189.837688,20.5262273 189.574251,20.5262273 L185.501279,20.5262273 Z" id="button" stroke="none" fill="#61BDE0" fillRule="evenodd"></path>
    </svg>
  </Icon>
