import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "components/Button";
import { partial } from "lodash";
import guestUserIcon from "./guest-user-avatar.svg";

const GUEST_USER = {
  displayName: "Guest",
  email: "guest@example.org",
  photoURL: guestUserIcon
};

const GuestSignInButton = styled(Button)`
  margin-top: 1em;
`;

const GuestSignInForm = ({ onSignIn }) => (
  <GuestSignInButton primary onClick={partial(onSignIn, GUEST_USER)}>
    Sign-in anonymously
  </GuestSignInButton>
);

GuestSignInForm.propTypes = {
  onSignIn: PropTypes.func.isRequired
};

export default GuestSignInForm;
