import React from "react";
import IconButton from "components/IconButton";
import { AddPageIcon } from "./icons";

const AddQuestionPageButton = props => {
  return (
    <IconButton clear {...props}>
      <AddPageIcon />
      Add question page
    </IconButton>
  );
};

export default AddQuestionPageButton;
