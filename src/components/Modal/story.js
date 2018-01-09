import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Modal from "components/Modal";
import Button from "components/Button";
import styled from "styled-components";
import { AlertList, Alert } from "components/Dialog/Alert";
import QP from "components/QuestionnaireProperties";
import Dialog from "components/Dialog";
import {
  Header,
  Message,
  Heading,
  Subheading,
  Description,
  Icon
} from "components/Dialog/Header";
import PropTypes from "prop-types";

const Background = styled.div`
  padding: 1em;
`;

const LargeContent = styled.div`
  width: 900px;
`;

class StatefulModal extends React.Component {
  static propTypes = {
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
    primaryAction: PropTypes.func.isRequired,
    primaryActionText: PropTypes.string.isRequired,
    secondaryAction: PropTypes.func,
    secondaryActionText: PropTypes.string,
    tertiaryAction: PropTypes.func,
    tertiaryActionText: PropTypes.string,
    icon: PropTypes.oneOf(["move", "delete"]),
    children: PropTypes.node
  };

  static defaultProps = {
    heading: "Title",
    subheading: "Subheading",
    description: "Description",
    icon: "move",
    primaryAction: action("Primary action"),
    primaryActionText: "Primary action",
    secondaryActionText: "Secondary action"
  };

  state = {
    showDialog: true
  };

  handleOpen = () => {
    this.setState({ showDialog: true });
  };

  handleClose = () => {
    this.setState({ showDialog: false });
  };

  render() {
    return (
      <Background>
        <Button primary onClick={this.handleOpen}>
          Trigger modal
        </Button>
        <Modal
          isOpen={this.state.showDialog}
          onClose={this.handleClose}
          {...this.props}
        >
          <Dialog
            onClose={this.handleClose}
            primaryAction={this.props.primaryAction}
            primaryActionText={this.props.primaryActionText}
            secondaryAction={this.props.secondaryAction}
            secondaryActionText={this.props.secondaryActionText}
            {...this.props}
          >
            <Header>
              <Message>
                <Heading>{this.props.heading}</Heading>
                <Subheading>{this.props.subheading}</Subheading>
                <Description>{this.props.description}</Description>
              </Message>
              <Icon icon={this.props.icon} />
            </Header>
            {this.props.children}
          </Dialog>
        </Modal>
      </Background>
    );
  }
}

storiesOf("Modal", module)
  .add("Modal - Default", () => (
    <StatefulModal secondaryAction={action("Secondary action")} />
  ))
  .add("Modal - Move", () => (
    <StatefulModal
      heading="Move"
      subheading="who lives here / household details"
      description="Are you sure you want to delete this page?"
      icon="move"
      primaryActionText="Yes, move"
      secondaryActionText="No, cancel"
      secondaryAction={action("Secondary action")}
    />
  ))
  .add("Modal - Delete", () => (
    <StatefulModal
      heading="Delete"
      subheading="who lives here / household details"
      description="Are you sure you want to delete this page?"
      icon="delete"
      primaryActionText="Yes, delete this page"
      secondaryActionText="No, don't delete"
      secondaryAction={action("Secondary action")}
    >
      <AlertList>
        <Alert>
          All edits, properties and routing settings will also be removed.
        </Alert>
      </AlertList>
    </StatefulModal>
  ))
  .add("Modal - Should grow with content", () => (
    <StatefulModal
      heading="Large Dialog Example"
      subheading=""
      description="The modal should change size based on its content."
      icon="delete"
      primaryActionText="Save"
      tertiaryAction={action("Tertiary action")}
      tertiaryActionText="Delete"
      secondaryAction={undefined}
    >
      <LargeContent>
        <QP
          onChange={action("change")}
          onUpdate={action("update")}
          questionnaire={{}}
        />
      </LargeContent>
    </StatefulModal>
  ));
