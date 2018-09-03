import React from "react";
import styled from "styled-components";
import Icon from "./icon-alert.svg?inline";

export const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const NotAvailableMsg = styled.div`
  padding: 0.5em;
`;

const NotAvailable = ({ type }) => (
  <Flex>
    <Icon width="1.4em" />
    <NotAvailableMsg>
      Sorry, no previous answers are of type{" "}
      <strong>{type.toLowerCase()}</strong>
    </NotAvailableMsg>
  </Flex>
);

export default NotAvailable;
