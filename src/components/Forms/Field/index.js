import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledField = styled.div`
  display: block;
  width: 100%;
  margin-bottom: ${props => (props.last ? "0" : "1")}em;
`;

const Field = ({ children, last, id, ...otherProps }) =>
  <StyledField last={last}>
    {Children.map(children, child =>
      cloneElement(child, { id, ...otherProps })
    )}
  </StyledField>;

Field.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  last: PropTypes.bool
};

export default Field;
