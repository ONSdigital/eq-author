import styled from "styled-components";
import { colors } from "constants/theme";

export const Flex = styled.div`
  display: flex;
  width: 100%;
`;

export const Fieldset = styled.div`
  padding: 0;
  border: 0;
  margin: 0;
`;

export const Legend = styled.div.attrs()`
  margin: 0 0 1em;
  font-size: 0.65em;
  font-weight: 900;
  text-transform: uppercase;
  color: #7d7d7d;
  letter-spacing: 0.5px;
`;

export const Field = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  &:not(:last-of-type) {
    margin-right: 0.8em;
  }
`;

export const Label = styled.label`
  margin-bottom: 0.5em;
  font-size: 0.8em;
  font-weight: 600;
  transition: color 200ms ease-out;
  ${"" /* color: ${props => (props.valid ? "inherit" : colors.red)}; */};
`;

export const Input = styled.input`
  border: 1px solid ${props => (props.valid ? colors.borders : colors.red)};
  padding: 0.7em 0.6em;
  font-size: 0.8em;
  border-radius: 3px;
  display: block;
  width: 100%;
  transition: border-color 200ms ease-out;
  &:focus {
    border-color: ${props => (props.valid ? colors.lightBlue : colors.red)};
    outline: ${props => (props.valid ? "none" : `1px solid ${colors.red}`)};
  }
`;
