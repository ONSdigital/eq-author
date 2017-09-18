import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const activeState = css`
  background-color: #eee;
  color: #333;
`;

const Button = styled.button`
  display: block;
  padding: 0;
  border: 1px solid #eee;
  background: none;
  cursor: pointer;
  color: #6d6d6d;
  font-weight: 900;
  width: 3em;
  height: 3em;
  margin-left: -1px;
  font-size: 1em;
  &:hover,
  &:focus {
    background-color: #f9f9f9;
    outline: none;
  }

  ${props => props.active && activeState};
`;

const Wrapper = styled.div`
  display: flex;
  padding: 0;
  margin-bottom: 1em;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

export const STYLE_BLOCK = "block";
export const STYLE_INLINE = "inline";

const controls = [
  { name: "heading", label: "H", type: STYLE_BLOCK, style: "header-two" },
  {
    name: "list",
    label: "UL",
    type: STYLE_BLOCK,
    style: "unordered-list-item"
  },
  { name: "bold", label: "B", type: STYLE_INLINE, style: "BOLD" },
  { name: "emphasis", label: "E", type: STYLE_INLINE, style: "emphasis" }
];

class ToolBar extends React.Component {
  static defaultProps = {
    bold: true,
    emphasis: true,
    heading: true,
    list: true
  };

  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    active: PropTypes.func.isRequired,
    bold: PropTypes.bool,
    emphasis: PropTypes.bool,
    heading: PropTypes.bool,
    list: PropTypes.bool
  };

  render() {
    const { active, onToggle } = this.props;

    return (
      <Wrapper>
        <ButtonGroup>
          {controls.filter(control => this.props[control.name]).map(control =>
            <Button
              key={control.label}
              active={active(control)}
              onMouseDown={function() {
                onToggle(control);
              }}
            >
              {control.label}
            </Button>
          )}
        </ButtonGroup>
      </Wrapper>
    );
  }
}

export default ToolBar;
