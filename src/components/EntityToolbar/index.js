import React from "react";

import IconButtonDelete from "components/IconButtonDelete";
import { Toolbar, Buttons } from "components/EditorSurface/Toolbar";

import PropTypes from "prop-types";

const EntityToolbar = ({ children, onDelete }) => (
  <Toolbar>
    <Buttons>
      {children}
      <IconButtonDelete onClick={onDelete} data-test="btn-delete">
        Delete
      </IconButtonDelete>
    </Buttons>
  </Toolbar>
);
EntityToolbar.propTypes = {
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default EntityToolbar;
