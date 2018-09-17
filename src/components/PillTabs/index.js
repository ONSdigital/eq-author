import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BaseTabs from "components/BaseTabs";

import { colors } from "constants/theme";

const ListWrapper = styled.div`
  background-color: ${colors.lightMediumGrey};
  border-radius: 3em;
  display: flex;
  margin: 0.25em 0 1em;
`;
const ListItem = styled.button`
  background: none;
  border: none;
  border-radius: 3em;
  color: ${colors.textLight};
  cursor: pointer;
  flex: 1 1 auto;
  padding: 0.5em 0;

  text-align: center;

  font: inherit;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${colors.tertiary};
  }
  &:hover {
    background: ${colors.grey};
    color: ${colors.white};
  }
  &:focus&:hover {
    background: ${colors.secondary};
  }

  &[aria-selected="true"] {
    background: ${colors.primary};
    color: ${colors.white};
    z-index: 1;
  }
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
`;

const PillTabs = ({ options, value, onChange }) => (
  <BaseTabs
    TabList={ListWrapper}
    ContentWrapper={Flex}
    buttonRender={(props, tab) => <ListItem {...props}>{tab.title}</ListItem>}
    onChange={onChange}
    activeId={value}
    tabs={options}
  />
);

PillTabs.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired
    })
  ),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default PillTabs;
