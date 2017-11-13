import React from "react";
import styled, { css, keyframes } from "styled-components";
import closeIcon from "./icon-chip-close.svg";

const bump = keyframes`
	from {
		transform: translateY(5%);
	}

	to {
		transform: translateY(0);
	}
`;

const editing = css`
  border-radius: 1em 1em 0 0;
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0) 75%,
    rgba(0, 0, 0, 0.14) 100%
  );

  animation: ${bump} 0.1s ease-in-out;
  &:hover {
    background-image: linear-gradient(
      -180deg,
      rgba(255, 255, 255, 0) 75%,
      rgba(0, 0, 0, 0.14) 100%
    );
  }
`;

const StyledChip = styled.div`
  background: #0288d1;
  color: white;
  padding: 0.5em 2.5em 0.5em 1em;
  font-size: 0.9em;
  margin: 0.2em;
  border-radius: 1em;
  display: flex;
  align-items: center;
  position: relative;
  user-select: none;
  cursor: pointer;
  transition: background-color 300ms ease-in-out;

  &:hover {
    background: #057fc1;
  }

  ${props => props.isEditing && editing};
`;

const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
`;

const CloseBtn = styled.button`
  background: url('${closeIcon}') no-repeat 0 0;
  width: 1.5em;
  height: 1.5em;
  border: none;
  margin-left: 0.5em;
  position: absolute;
  right: 0.7em;
  opacity: 1;
  &:hover, &:focus {
    opacity: 0.9;
    outline: none;
  }
`;

const Chip = ({
  title,
  onRemove,
  id,
  optionId,
  conditionId,
  onClick,
  value,
  isEditing,
  comparator,
  ...otherProps
}) => (
  <StyledChip
    onClick={onClick}
    data-id={id}
    data-value={value}
    data-comparator={comparator}
    isEditing={isEditing}
  >
    <Text {...otherProps} dangerouslySetInnerHTML={{ __html: title }} />
    <CloseBtn
      type="button"
      onClick={function(e) {
        e.preventDefault();
        e.stopPropagation();

        onRemove(conditionId, id, optionId);
      }}
    />
  </StyledChip>
);

export default Chip;
