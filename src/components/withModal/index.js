import React from "react";
import PropTypes from "prop-types";

const withModal = WrappedComponent => {
  return class EntityEditor extends React.Component {
    static displayName = `withModal(${WrappedComponent.displayName})`;

    state = {
      isModalOpen: false
    };

    handleModalOpen = () => this.setState({ isModalOpen: true });
    handleModalClose = () => this.setState({ isModalOpen: false });

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isModalOpen={this.state.isModalOpen}
          onModalOpen={this.handleModalOpen}
          onModalClose={this.handleModalClose}
        />
      );
    }
  };
};

export const ModalPropTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired
};

export default withModal;
