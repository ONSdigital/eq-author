import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { sharedStyles } from "components/Forms/css";

const TextInput = styled.div`
  ${sharedStyles};
  padding: 1.2em 1.2em 1.2em 2em;
  position: relative;
  background-color: transparent;
  z-index: 0;
  width: 50%;
`;

const Placeholder = styled.div`
  position: absolute;
  left: 1em;
  top: 0;
  bottom: 0;
  height: 1em;
  line-height: 1;
  margin: auto;
  color: #c5c5c5;
`;

const DummyTextInput = ({ placeholder, ...props }) => (
  <TextInput {...props}>
    {placeholder && <Placeholder>{placeholder}</Placeholder>}
  </TextInput>
);

DummyTextInput.propTypes = {
  placeholder: PropTypes.string,
  children: PropTypes.node
};

export default DummyTextInput;
