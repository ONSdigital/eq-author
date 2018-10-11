import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "components/Button";
import IconAddRule from "./icon-add-rule.svg?inline";
import IconRouting from "./icon-routing.svg?inline";
import IconText from "components/IconText";
import { colors } from "constants/theme";

const Container = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 2em 0;
  margin-bottom: ${props => (props.hasMargin ? "3em" : "0")};
  border-top: 1px solid #efefef;
  background: ${colors.white};
  border: 1px solid ${colors.bordersLight};
  border-radius: 0 0 4px 4px;
`;

const Icon = styled(IconRouting)`
  display: block;
  margin: 0 auto 0.5em;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 600;
  margin-bottom: 0.5em;
`;

const Paragraph = styled.p`
  margin: 0;
`;

const AddRuleButton = styled(Button)`
  margin: 2em auto 1em;
`;

const RoutingRuleSetMsg = ({
  title,
  onAddRuleSet,
  children,
  ...otherProps
}) => (
  <Container hasMargin={!onAddRuleSet} {...otherProps}>
    <Icon />
    <Title>{title}</Title>
    <Paragraph>{children}</Paragraph>
    {onAddRuleSet && (
      <AddRuleButton
        small
        naked
        variant="primary"
        onClick={onAddRuleSet}
        data-test="btn-add-rule"
      >
        <IconText icon={IconAddRule}>Add your first rule</IconText>
      </AddRuleButton>
    )}
  </Container>
);

RoutingRuleSetMsg.propTypes = {
  title: PropTypes.string.isRequired,
  onAddRuleSet: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default RoutingRuleSetMsg;
