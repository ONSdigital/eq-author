import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";
import Tooltip from "components/Tooltip";
import Button from "components/Button";

const UserAvatar = styled.img`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
`;

export const LogoutButton = styled(Button)`
  padding-left: 0;
  padding-right: 0;
`;

const UserProfile = ({ user, onSignOut }) => (
  <Tooltip content="Sign Out">
    <LogoutButton clear onClick={onSignOut}>
      <UserAvatar src={user.photoURL} alt="" role="presentation" />
    </LogoutButton>
  </Tooltip>
);

UserProfile.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  user: CustomPropTypes.user.isRequired
};

export default UserProfile;
