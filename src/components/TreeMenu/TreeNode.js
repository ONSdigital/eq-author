import React, {Component} from 'react';
import styled, {css} from 'styled-components';

import {TreeNodeChildren} from 'components/TreeMenu';
import {NavLink} from 'react-router-dom';

const TreeNode = styled.div`
  color: white;
  &:nth-child(odd) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const SectionLabel = css`
  font-weight: 700;
`;

const QuestionLabel = css`
  font-weight: 700;
  font-size: 0.9em;
  padding-left: 2em;
`;

const AnswerLabel = css`
  font-size: 0.8em;
  padding-left: 2em;
`;

const TreeNodeLabel = styled(NavLink)`
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 0.9em;
  &:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.02);
  }

  &:hover {
    background-color: rgba(97, 189, 224, 0.5);
  }

  &.active {
    background-color: rgba(97, 189, 224, 1);
  }

  ${props => props.type === 'section' && SectionLabel}
  ${props => props.type === 'question' && QuestionLabel}
  ${props => props.type === 'answer' && AnswerLabel}
`;

TreeNodeLabel.defaultProps = {
  activeClassName: 'active',
};

export default class extends Component {
  render() {
    const {label, children, to, type, ...otherProps} = this.props;
    return (
      <TreeNode {...otherProps}>
        <TreeNodeLabel to={to} type={type} exact={true}>
          {label}
        </TreeNodeLabel>
        {children && <TreeNodeChildren>{children}</TreeNodeChildren>}
      </TreeNode>
    );
  }
}
