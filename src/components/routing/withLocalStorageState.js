import React from "react";

/* eslint-disable react/jsx-handler-names */

export function withLocalStorageState(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    static defaultProps = {
      storageKey: "EQ_AUTHOR"
    };

    componentWillUnmount() {
      localStorage.setItem(this.props.storageKey, JSON.stringify(this.state));
    }

    componentWillMount() {
      const rehydrate = JSON.parse(localStorage.getItem(this.props.storageKey));
      this.setState(rehydrate);
    }

    handleSetState = state => {
      this.setState(state, () =>
        localStorage.setItem(this.props.storageKey, JSON.stringify(this.state))
      );
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          localState={this.state}
          setLocalState={this.handleSetState}
        />
      );
    }
  };
}

export default withLocalStorageState;
