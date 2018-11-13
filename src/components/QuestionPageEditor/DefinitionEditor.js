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
  margin-bottom: 2em;
  border-radius: ${radius};

  &:focus-within {
    border-color: ${colors.blue};
    box-shadow: 0 0 0 1px ${colors.blue};
  }
`;

const DefinitionLabel = styled.div`
  color: ${colors.darkGrey};
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const Padding = styled.div`
  padding: 1.5em 1.5em 0;
`;

const DefinitionEditor = ({ children, label, className }) => (
  <div className={className}>
    <DefinitionLabel>{label}</DefinitionLabel>
    <Definition>
      <Padding>{children}</Padding>
    </Definition>
  </div>
);

export default DefinitionEditor;
