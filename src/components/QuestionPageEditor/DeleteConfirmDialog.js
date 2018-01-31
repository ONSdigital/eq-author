import React from "react";

import styled from "styled-components";

import ModalDialog from "components/ModalDialog";
import DialogHeader from "components/Dialog/DialogHeader";
import DialogIcon from "components/Dialog/DialogIcon";
import {
  Message,
  Heading,
  Subheading,
  Description
} from "components/Dialog/DialogMessage";
import Button from "components/Button/index";
import ButtonGroup from "components/ButtonGroup/index";

import PropTypes from "prop-types";

import iconAlert from "./icon-alert.svg";
import iconPage from "./icon-dialog-page.svg";

const DeleteConfirmModalDialog = styled(ModalDialog)`
  width: 30em;
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
  margin-bottom: 1em;

  &::before {
    content: url(${iconAlert});
    display: inline-block;
    margin: 0 0.5em 0 0;
  }
`;

const DeleteConfirmDialog = ({
  title,
  onDeletePage,
  onClose,
  ...otherProps
}) => (
  <DeleteConfirmModalDialog onClose={onClose} {...otherProps}>
    <DialogHeader>
      <Message>
        <Heading>Delete</Heading>
        <Subheading>{title}</Subheading>
        <Description>
          <Alert>
            All edits, properties and routing settings will also be removed.
          </Alert>
        </Description>
      </Message>
      <DialogIcon icon={iconPage} />
    </DialogHeader>
    <ButtonGroup horizontal align="right">
      <Button secondary onClick={onClose} data-test="btn-cancel">
        Cancel
      </Button>
      <Button tertiary autoFocus onClick={onDeletePage} data-test="btn-delete">
        Delete
      </Button>
    </ButtonGroup>
  </DeleteConfirmModalDialog>
);

DeleteConfirmDialog.propTypes = {
  title: PropTypes.string,
  onDeletePage: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DeleteConfirmDialog;
