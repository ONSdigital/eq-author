import React from "react";
import styled from "styled-components";
import { FullPageLayout } from "layouts";

const Centered = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFound = props => {
  return (
    <FullPageLayout>
      <Centered>
        <h1>404 Error - Page not found</h1>
      </Centered>
    </FullPageLayout>
  );
};

export default NotFound;
