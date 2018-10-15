import React from "react";
import styled from "styled-components";
import { colors } from "constants/theme";
import iconClose from "./icon-close.svg";
import VisuallyHidden from "../VisuallyHidden";
import Truncated from "../Truncated";

const RemoveButton = styled.button`
  border: none;
  background: transparent url(${iconClose}) no-repeat center;
  background-size: 0.5em;
  font-size: 1rem;
  width: 1em;
  height: 1em;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  &:focus,
  &:active {
    outline-width: 0;
  }

  &:focus {
    box-shadow: 0 0 0 3px ${colors.tertiary};
    outline: none;
  }
`;

const Chip = styled.div`
  font-size: 1rem;
  background: ${colors.primary};
  padding: 0.4em 0.3em 0.4em 0.5em;
  border-radius: 4px;
  color: white;
  border: none;
  display: inline-flex;
  align-items: center;
  margin: 0.25rem;
  max-width: 12em;
`;

const Label = styled.span`
  margin-right: 0.2em;
`;

export default ({ onRemove, children, id, ...otherProps }) => {
  return (
    <Chip id={id} {...otherProps}>
      <Truncated>
        <Label>{children}</Label>
      </Truncated>

      <RemoveButton onClick={() => onRemove(id)}>
        <VisuallyHidden>Remove</VisuallyHidden>
      </RemoveButton>
    </Chip>
  );
};
