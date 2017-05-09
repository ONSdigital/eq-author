import React from 'react'
import styled from 'styled-components'

const SectionTitle = styled.div`
  font-size: 1.55556em;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 1rem;
  position: relative;
`;

const SectionNumber = styled.div`
  position: absolute;
  top: -4px;
  left: -62px;
  font-size: 1rem;
  display: flex;
  min-width: 48px;
  height: 48px;
  margin-right: 14px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  vertical-align: top;
  &::before {
      content: "";
      background-color: #033e58;
      border-radius: 100%;
      position: absolute;
      display: block;
      z-index: -1;
      top: 0;
      left: 0;
      min-width: 48px;
      height: 48px;
    }
`;

const SectionDescription = styled.div`
  font-size: 1em;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 1rem;
`;

export default ({section, children}) => {
  return (
    <div>
      <SectionTitle><SectionNumber>1</SectionNumber>{section.title}</SectionTitle>
      <SectionDescription>{section.description}</SectionDescription>
      {children}
    </div>
  )
}
