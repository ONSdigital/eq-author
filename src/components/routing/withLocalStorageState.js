import React from "react";

/* eslint-disable react/jsx-handler-names */

export function withLocalStorageState(WrappedComponent) {
  return class extends React.Component {
    state = {};

    componentWillUnmount() {
      localStorage.setItem("NUMERIC_ROUTING", JSON.stringify(this.state));
    }

    componentWillMount() {
      const rehydrate = JSON.parse(localStorage.getItem("NUMERIC_ROUTING"));
      this.setState(rehydrate);
    }

    handleSetState = state => {
      this.setState(state, () =>
        localStorage.setItem("NUMERIC_ROUTING", JSON.stringify(this.state))
      );
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          state={this.state}
          setState={this.handleSetState}
        />
      );
    }
  };
}

export default withLocalStorageState;
