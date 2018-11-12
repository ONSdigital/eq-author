import React from "react";

import styled from "styled-components";

import { colors, radius } from "constants/theme";

const Container = styled.div`
  padding: 1em;
  border: 1px solid ${colors.borders};
  border-radius: 1 ${radius};
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 1em;
  color: ${colors.text};
`;

const Definition = styled.div`
  border: 1px solid ${colors.bordersLight};
  position: relative;
  border-radius: ${radius};

  &:focus-within {
    border-color: ${colors.blue};
    box-shadow: 0 0 0 1px ${colors.blue};
  }
`;

const DefinitionLabel = styled.div`
  background: ${colors.lightMediumGrey};
  border-bottom: 1px solid ${colors.bordersLight};
  text-align: center;
  padding: 0.5em 1em;
  font-size: 0.8em;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: ${radius} ${radius} 0 0;
`;

const Padding = styled.div`
  padding: 1.5em 1.5em 0;
`;

const DefinitionEditor = ({ children, label, className }) => (
  <Definition className={className}>
    <DefinitionLabel>{label}</DefinitionLabel>
    <Padding>{children}</Padding>
  </Definition>
);

export default DefinitionEditor;
