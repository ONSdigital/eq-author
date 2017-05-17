import React, { Component } from "react";
import styled from "styled-components";

import { TreeNodeChildren, TreeNodeLabel } from "components/TreeMenu";
import AddButton, { EDIT_MODE } from "components/AddButton";

import AddIcon from "./AddIcon";

const TreeNode = styled.div`
  color: white;
  position: relative;
  &:nth-child(odd) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const AddIconBtn = styled(AddIcon)`
  position: absolute;
  width: 2em;
  right: 0;
  top: 0;
  bottom: 0;
  height: 3em;
  margin: auto;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { newItem: false };
  }

  handleAddItem = e => {
    e.preventDefault();
    this.props.addItem(this.props.type, this.props.id);
  };

  handleApplyAddItem = value => {
    this.props.addItemComplete(this.props.type, this.props.id, value);
    this.props.removeItem(this.props.type, this.props.id);
  };

  handleCancelAddItem = () => {
    this.props.removeItem(this.props.type, this.props.id);
  };

  renderLabel() {
    const { label, children, to, type } = this.props;

    return (
      <div>
        <TreeNodeLabel to={to} type={type} exact>
          {label}
          {type !== "answers" && <AddIconBtn onClick={this.handleAddItem} />}
        </TreeNodeLabel>
        {children && <TreeNodeChildren>{children}</TreeNodeChildren>}
      </div>
    );
  }

  renderButton() {
    return (
      <AddButton
        editLabel="Name"
        mode={EDIT_MODE}
        onApplyLabel={this.handleApplyAddItem}
        onCancel={this.handleCancelAddItem}
      >
        Add
      </AddButton>
    );
  }

  render() {
    const { label, ...otherProps } = this.props;

    return (
      <TreeNode {...otherProps}>
        {label === undefined
          ? this.renderButton()
          : this.renderLabel()}
      </TreeNode>
    );
  }
}
