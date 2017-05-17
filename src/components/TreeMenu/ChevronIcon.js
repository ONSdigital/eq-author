import React from "react";
import styled from "styled-components";

const Icon = styled.div`
  transition: transform 200ms ease-out;
  transform: rotate(${props => props.open * 90}deg);
  transform-origin: 50%;
  display: flex;
  width: 1em;
  height: 1em;
  position: relative;
  svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
`;

export default ({ open, width, height, fill }) => (
  <Icon open={open}>
    <svg
      width="5px"
      height="9px"
      viewBox="0 0 20 34"
      version="1.1"
    >
      <polyline
        stroke="#E7E3E3"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        points="3 3 17 17.7276633 3 31"
      />
    </svg>
  </Icon>
);
