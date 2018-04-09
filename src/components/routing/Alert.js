import React from "react";
import styled from "styled-components";
import InfoIcon from "./icon-info.svg?inline";
import { PropTypes } from "prop-types";

export const AlertContainer = styled.div`
  padding: 1.85em 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AlertTitle = styled.h2`
  font-size: 1em;
  font-weight: 600;
  margin: 0 0 0.2em;
`;

export const AlertText = styled.div`
  font-size: 0.9em;
`;

export const AlertIcon = styled(InfoIcon)`
  display: inline-block;
  flex: 0 0 auto;
  margin-right: 1em;
`;

export const Alert = ({ children }) => (
  <AlertContainer>
    <AlertIcon />
    <div>{children}</div>
  </AlertContainer>
);

Alert.propTypes = {
  children: PropTypes.node.isRequired
};