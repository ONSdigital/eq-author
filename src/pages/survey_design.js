import React from 'react'
import styled from 'styled-components'
import ActionBar from '../components/ActionBar'
import Button from '../components/Button'

const AddSVG = () => (
  <svg width="14px" height="14px" viewBox="0 1 14 14" version="1.1">
      <path d="M7.00602929,1 C3.14728682,1 0,4.13793103 0,8 C0,11.862069 3.13522825,15 7.00602929,15 C10.8647717,15 14,11.862069 14,8 C14,4.13793103 10.8647717,1 7.00602929,1 L7.00602929,1 Z M7.00602929,14.0224138 C3.68992248,14.0224138 0.988802756,11.3189655 0.988802756,8 C0.988802756,4.68103448 3.68992248,1.97758621 7.00602929,1.97758621 C10.3221361,1.97758621 13.0232558,4.68103448 13.0232558,8 C13.0232558,11.3189655 10.3221361,14.0224138 7.00602929,14.0224138 Z M10.2256675,7.44482759 L7.50043066,7.44482759 L7.50043066,4.70517241 C7.50043066,4.42758621 7.2833764,4.21034483 7.00602929,4.21034483 C6.72868217,4.21034483 6.51162791,4.42758621 6.51162791,4.70517241 L6.51162791,7.43275862 L3.78639104,7.43275862 C3.50904393,7.43275862 3.29198966,7.65 3.29198966,7.92758621 C3.29198966,8.20517241 3.50904393,8.42241379 3.78639104,8.42241379 L6.51162791,8.42241379 L6.51162791,11.15 C6.51162791,11.4275862 6.72868217,11.6448276 7.00602929,11.6448276 C7.2833764,11.6448276 7.50043066,11.4275862 7.50043066,11.15 L7.50043066,8.42241379 L10.2256675,8.42241379 C10.5030146,8.42241379 10.7200689,8.20517241 10.7200689,7.92758621 C10.7200689,7.65 10.5030146,7.44482759 10.2256675,7.44482759 L10.2256675,7.44482759 Z" id="add" stroke="none" fill="#73BDDF" fillRule="evenodd"></path>
  </svg>
)
const Icon = styled.span`
  margin-right: 1em;
`
const HintButton = styled.button`
  padding: 60px;
  background-color: #fafafa;
  border: 2px dashed #e8e8e9;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const BodyContent = styled.div`
  display: flex;
  flex: 1 0 100%;
  align-items: center;
  justify-content: center;
  height: 80vh;
`
const ActionButton = styled(Button)`
    margin: 1em;
`
const SurveyDesignPage = (props) => {
  return (
    <div>
      <ActionBar>
        <ActionButton secondary small>Export</ActionButton>
        <ActionButton primary small>Save</ActionButton>
      </ActionBar>
      <BodyContent>
        <HintButton>
          <Icon><AddSVG /></Icon> Add section
        </HintButton>
      </BodyContent>
    </div>
  )
}

export default SurveyDesignPage
