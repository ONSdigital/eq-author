import React, { Fragment } from "react";
import styled from "styled-components";
import Error from "../ValidationError";

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
