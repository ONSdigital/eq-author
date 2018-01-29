import React from "react";
import PropTypes from "prop-types";

class ModalTrigger extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  state = {
    isOpen: false
  };

  handleModalOpen = () => {
    this.setState({ isOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return this.props.children({
      isOpen: this.state.isOpen,
      onOpen: this.handleModalOpen,
      onClose: this.handleModalClose
    });
  }
}

export default ModalTrigger;
