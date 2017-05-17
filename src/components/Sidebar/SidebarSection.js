import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import AddIcon from "components/TreeMenu/AddIcon";

const AddBtn = styled.div`
  position: absolute;
  width: 2em;
  right: 0;
  top: 0;
  bottom: 0;
  height: 3em;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
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

const StyledSidebarSection = styled.div`
  display: block;
`;

const SidebarSection = ({ title, children, onAddClick }) => (
  <StyledSidebarSection>
    <Header>
      <Title>{title}</Title>
      <AddBtn onClick={onAddClick}>
        <AddIcon />
      </AddBtn>
    </Header>
    <Section>
      {children}
    </Section>
  </StyledSidebarSection>
);

SidebarSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object,
  onAddClick: PropTypes.func
}

export default SidebarSection
