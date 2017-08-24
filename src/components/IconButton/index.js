import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tooltip from "components/Tooltip";

import { keys } from "lodash";

import exportIcon from "./icon-export.svg";
import previewIcon from "./icon-preview.svg";

export const icons = { export: exportIcon, preview: previewIcon };

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5em;
  cursor: pointer;
  background: transparent;
  border: none;
  opacity: 0.9;
  transition: opacity 200ms ease-out;
  &:hover {
    opacity: 1;
  }
  &[disabled] {
    opacity: 0.5;
  }
`;

const IconButton = ({ icon, title, disabled, handleClick }) =>
  <Tooltip content={title}>
    <div>
      <Button onClick={handleClick} disabled={disabled}>
        <img src={icons[icon]} alt={title} />
      </Button>
    </div>
  </Tooltip>;

IconButton.propTypes = {
  icon: PropTypes.oneOf(keys(icons)),
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func
};

export default IconButton;
