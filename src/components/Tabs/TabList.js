import React from "react";
import styled, { css } from "styled-components";

const CompactTabList = css`
  background: #f9f9f9;
  border-bottom: 1px solid ${props => props.theme.colorBorders};
  margin: 0;
`;

const TabListStyle = styled.ul`
  list-style: none;
  margin: 0 0 -1px;
  padding: 0;
  display: flex;
  flex-direction: row;
  ${props => props.compact && CompactTabList}
`;

const TabList = ({
  children,
  selectedTab,
  handleTabSelected,
  ...otherProps
}) => (
  <TabListStyle {...otherProps}>
    {children.map((child, index) =>
      React.cloneElement(child, {
        selected: selectedTab === index,
        onClick: handleTabSelected.bind(this, index),
        key: index
      })
    )}
  </TabListStyle>
);

TabList.displayName = "TabList";

export default TabList;
