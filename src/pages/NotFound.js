import React from "react";
import styled from "styled-components";

const Centered = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFound = props => {
  return (
    <Centered>
      <h1>404 Error - Page not found</h1>
    </Centered>
  );
};

export default NotFound;
