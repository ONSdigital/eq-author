import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { flattenDeep } from "lodash";
import TabPanel from "./TabPanel";
import TabList from "./TabList";

const StyledTabs = styled.div`
  display: block;
`;

const TabsContent = styled.div`
  border: ${({ compact, theme }) => (compact ? "none" : `1px solid ${theme.colorBorders}`)};
  overflow: hidden;
`;

export default class Tabs extends Component {
  state = {
    selected: this.props.selected || 0
  };
  getComponentWithProps = (child, index) => {
    const props = {
      [TabList]: {
        selectedTab: this.state.selected,
        handleTabSelected: index => {
          this.setState({ selected: index });
        }
      },
      [TabPanel]: {
        visible: this.state.selected === index
      }
    };
    return React.cloneElement(child, {
      ...props[child.type],
      key: index
    });
  };
  render() {
    const { children, compact } = this.props;
    // flatten in case arrays of children
    const flattenedChildren = flattenDeep(children);
    return (
      <StyledTabs compact={compact}>
        {flattenedChildren
          .filter(child => child.type.displayName === TabList.displayName)
          .map(this.getComponentWithProps)}
        <TabsContent compact={compact}>
          {flattenedChildren
            .filter(child => child.type.displayName === TabPanel.displayName)
            .map(this.getComponentWithProps)}
        </TabsContent>
      </StyledTabs>
    );
  }
}

Tabs.propTypes = {
  selected: PropTypes.string,
  children: PropTypes.node,
  compact: PropTypes.bool
};
