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

class ToolBar extends React.Component {
  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    controls: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired
      })
    ).isRequired,
    active: PropTypes.func.isRequired
  };

  render() {
    const { active, onToggle, controls } = this.props;
    return (
      <Wrapper>
        <ButtonGroup>
          {controls.map(control =>
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
