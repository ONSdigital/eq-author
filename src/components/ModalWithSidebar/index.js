import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Modal from "components/Modal";
import DialogHeader from "components/Dialog/DialogHeader";
import { Message, Heading } from "components/Dialog/DialogMessage";

import { Grid, Column } from "components/Grid";
import { colors } from "constants/theme";
import Button from "components/Button";

const Dialog = styled(Modal)`
  .Modal {
    width: 60em;
    padding: 0;
  }
`;

const CenteredHeading = styled(Heading)`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Sidebar = styled.div`
  background: ${colors.lighterGrey};
  height: 100%;
`;

const MainContainer = styled.div`
  padding: 2em 3em;
  min-height: 30em;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1 1 auto;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalWithSidebar = ({
  title,
  onDelete,
  onClose,
  alertText,
  sidebarChildren,
  children,
  ...otherProps
}) => (
  <Dialog onClose={onClose} {...otherProps}>
    <Grid fillHeight>
      <Column cols={3} gutters={false}>
        <Sidebar>{sidebarChildren}</Sidebar>
      </Column>
      <Column cols={9} gutters={false}>
        <MainContainer>
          <DialogHeader>
            <Message>
              <CenteredHeading>{title}</CenteredHeading>
            </Message>
          </DialogHeader>
          <Content>{children}</Content>
          <Buttons>
            <Button onClick={onClose} variant="primary" type="button">
              Done
            </Button>
          </Buttons>
        </MainContainer>
      </Column>
    </Grid>
  </Dialog>
);

ModalWithSidebar.propTypes = {
  title: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  alertText: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  sidebarChildren: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export default ModalWithSidebar;
