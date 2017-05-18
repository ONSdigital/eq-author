import React from "react";
import styled from "styled-components";

const noop = () => {};

const TextArea = styled.textarea`
  resize: none;
`;

export default ({ value, id, rows = 10, ...otherProps }) => (
  <TextArea
    value={value}
    rows={rows}
    id={id}
    name={id}
    onChange={noop}
    {...otherProps}
  />
);
