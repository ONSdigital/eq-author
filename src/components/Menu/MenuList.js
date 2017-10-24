import React from "react";
import { MenuList as RMLMenuList } from "react-menu-list";
import { MenuScrollPane } from "components/Menu";
import PropTypes from "prop-types";

const MenuList = ({ children, maxHeight, ...otherProps }) => (
  <MenuScrollPane maxHeight={maxHeight}>
    <RMLMenuList {...otherProps}>{children}</RMLMenuList>
  </MenuScrollPane>
);

MenuList.propTypes = {
  children: PropTypes.node.isRequired,
  maxHeight: PropTypes.string
};

export default MenuList;
