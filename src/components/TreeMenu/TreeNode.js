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

  addItem = e => {
    e.preventDefault();
    this.props.addItem(this.props.type, this.props.id);
  };

  applyAddItem = value => {
    this.props.addItemComplete(this.props.type, this.props.id, value);
    this.props.removeItem(this.props.type, this.props.id);
  };

  cancelAddItem = () => {
    this.props.removeItem(this.props.type, this.props.id);
  };

  render() {
    const { label, children, to, type, ...otherProps } = this.props;
    return (
      <TreeNode {...otherProps}>
        {label === undefined
          ? <AddButton
              editLabel="Name"
              mode={EDIT_MODE}
              onApplyLabel={this.applyAddItem}
              onCancel={this.cancelAddItem}
            >
              Add
            </AddButton>
          : <div>
              <TreeNodeLabel to={to} type={type} exact={true}>
                {label}
                {type !== "answers" && <AddIconBtn onClick={this.addItem} />}
              </TreeNodeLabel>
              {children && <TreeNodeChildren>{children}</TreeNodeChildren>}
            </div>}
      </TreeNode>
    );
  }
}
