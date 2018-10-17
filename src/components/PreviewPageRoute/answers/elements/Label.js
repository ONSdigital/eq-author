import React, { Fragment } from "react";
import styled from "styled-components";
import { colors } from "constants/theme";

const Description = styled.div`
  font-size: 0.8em;
  font-weight: normal;
  line-height: 1.4;
  display: inline-block;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.4em;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4;
`;

const Error = styled.span`
  padding: 0.2em 0.3em;
  border: 2px dashed #b5c4cb;
  color: ${colors.secondary};
  font-weight: bold;
  margin-bottom: 1em;
`;

export default ({ description, children }) => (
  <Label>
    {children || <Error>Missing label</Error>}
    {description && (
      <Fragment>
        <br />
        <Description>{description}</Description>
      </Fragment>
    )}
  </Label>
);
