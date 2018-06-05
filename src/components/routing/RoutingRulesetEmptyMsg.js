import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "components/Button";
import IconAddRule from "./icon-add-rule.svg?inline";
import iconRouting from "./icon-routing.svg";
import IconText from "components/IconText";

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

const AddRuleButton = styled(Button)`
  margin: 2em auto 1em;
`;

const RoutingRulesetEmptyMsg = ({ title, onAddRule }) => (
  <Container>
    <Title>{title}</Title>
    <Paragraph>
      Users completing this question will be taken to the next page.
    </Paragraph>
    <AddRuleButton
      small
      naked
      variant="primary"
      onClick={onAddRule}
      data-test="btn-add-rule"
    >
      <IconText icon={IconAddRule}>Add your first rule</IconText>
    </AddRuleButton>
  </Container>
);

RoutingRulesetEmptyMsg.propTypes = {
  title: PropTypes.string.isRequired,
  onAddRule: PropTypes.func.isRequired
};

export default RoutingRulesetEmptyMsg;
