import React from "react";
import styled from "styled-components";

import AddIcon from "components/TreeMenu/AddIcon";
const AddBtn = styled(AddIcon)`
  position: absolute;
  width: 2em;
  right: 0;
  top: 0;
  bottom: 0;
  height: 3em;
  margin: auto;
`;

const Header = styled.header`
  background: #37404A;
  padding: 1em;
  position: relative;
`;

const Title = styled.div`
  font-size: 0.7em;
  font-weight: 700;
  color: #E0E0E0;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Section = styled.div`
  display: block;
`;

const SidebarSection = styled.div`
  display: block;
`;

export default ({ title, children, onAddClick }) => (
  <SidebarSection>
    <Header>
      <Title>{title}</Title>
      <AddBtn onClick={onAddClick} />
    </Header>
    <Section>
      {children}
    </Section>
  </SidebarSection>
);
