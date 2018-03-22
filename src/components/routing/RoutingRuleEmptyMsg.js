import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import IconButton from "components/IconButton";
import IconAddRule from "./icon-add-rule.svg?inline";
import iconRouting from "./icon-routing.svg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 1em 0;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 600;
  margin-bottom: 0.5em;
  &::before {
    content: url(${iconRouting});
    display: block;
    margin-bottom: 0.5em;
  }
`;

const Paragraph = styled.p`
  margin: 0;
`;

const AddRuleButton = styled(IconButton)`
  margin: 2em auto;
`;

const RoutingRuleEmpty = ({ title, onAddRule }) => (
  <Container>
    <Title>{title}</Title>
    <Paragraph>
      Users completing this question will be taken to the next page.
    </Paragraph>
    <AddRuleButton
      icon={IconAddRule}
      onClick={onAddRule}
      data-test="btn-add-rule"
    >
      Add your first rule
    </AddRuleButton>
  </Container>
);

RoutingRuleEmpty.propTypes = {
  title: PropTypes.string.isRequired,
  onAddRule: PropTypes.func.isRequired
};

export default RoutingRuleEmpty;
