import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "components/Modal";
import ScrollPane from "components/ScrollPane";

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  min-width: 0;
`;

const Title = styled.legend`
  margin: 0;
  padding: 0.75rem;
  color: #858585;
  font-size: 1.25em;
  font-weight: bold;
  display: block;
`;

const BodyWrapper = styled.div`
  max-height: 18em;
`;

const Body = ({ children }) => (
  <ScrollPane>
    <BodyWrapper>{children}</BodyWrapper>
  </ScrollPane>
);

Body.propTypes = {
  children: PropTypes.node.isRequired
};

const PlainModal = styled(Modal).attrs({ hasCloseButton: false })`
  .Overlay {
    background: transparent;
  }

  .Modal {
    width: 23em;
    padding: 0;
    top: 8em;
  }
`;

export default PlainModal;
export { Fieldset, Title, Body };
