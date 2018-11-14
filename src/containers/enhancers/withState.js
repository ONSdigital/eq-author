import React from "react";

function withState() {
  return function(WrappedComponent) {
    class WithState extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: props.value
        };
      }

      handleChange = ({ value }) => {
        this.setState({ value });
      };

      handleUpdate = () => {
        this.props.onUpdate({ name: this.props.id, value: this.state.value });
      };

      render() {
        return (
          <WrappedComponent
            onChange={this.handleChange}
            onBlur={this.handleUpdate}
            {...this.props}
            {...this.state}
          />
        );
      }
    }

    return WithState;
  };
}

export default withState;
