import React from "react";
import BaseLayout from "components/BaseLayout";
import styled from "styled-components";
import { get } from "lodash";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import Panel from "components/Panel";
import SignInForm from "components/SignInForm";
import Button from "components/Button";
import dummyUserIcon from "./dummy-user-avatar.svg";

import { isSignedIn, verifiedAuthStatus } from "redux/auth/reducer";
import { signInUser, verifyAuthStatus } from "redux/auth/actions";

const Centered = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 2em 0 1.5em;
`;

const Text = styled.p`
  margin-bottom: 0.75em;
`;

const SignInPanel = styled(Panel)`
  padding: 2em 5em;
  width: 22em;
  height: 13em;
`;

const DUMMY_USER = {
  displayName: "Dummy User",
  email: "dummy@example.org",
  photoURL: dummyUserIcon
};

const DummySignInButton = styled(Button)`
  margin-top: 1em;
`;

export class UnconnectedSignInPage extends React.Component {
  static propTypes = {
    returnURL: PropTypes.string,
    isSignedIn: PropTypes.bool.isRequired,
    verifiedAuthStatus: PropTypes.bool.isRequired,
    verifyAuthStatus: PropTypes.func.isRequired,
    signInUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    returnURL: "/"
  };

  componentDidMount() {
    const { isSignedIn, verifyAuthStatus } = this.props;

    if (!isSignedIn) {
      this.unsubscribe = verifyAuthStatus();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleAnonymousSignIn = () => {
    this.props.signInUser(DUMMY_USER);
  };

  renderDummySignIn() {
    return (
      <DummySignInButton primary onClick={this.handleAnonymousSignIn}>
        Sign-in anonymously
      </DummySignInButton>
    );
  }

  renderSignInForm() {
    return <SignInForm />;
  }

  render() {
    const { verifiedAuthStatus, isSignedIn, returnURL } = this.props;

    if (!verifiedAuthStatus) {
      return null;
    }

    if (isSignedIn) {
      return <Redirect to={returnURL} />;
    }

    return (
      <BaseLayout docTitle="Sign In">
        <Centered>
          <Title>Sign in</Title>
          <SignInPanel>
            <Text>You must be signed in to access this service.</Text>
            {process.env.REACT_APP_ENABLE_AUTH === "true"
              ? this.renderSignInForm()
              : this.renderDummySignIn()}
          </SignInPanel>
        </Centered>
      </BaseLayout>
    );
  }
}

export const mapStateToProps = (state, { location }) => ({
  isSignedIn: isSignedIn(state),
  verifiedAuthStatus: verifiedAuthStatus(state),
  returnURL: get(location, "state.returnURL")
});

export default connect(mapStateToProps, { signInUser, verifyAuthStatus })(
  UnconnectedSignInPage
);
