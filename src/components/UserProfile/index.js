import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";
import Tooltip from "components/Tooltip";
import Button from "components/Button";
import guestAvatar from "./guest-user-avatar.svg";

const UserAvatar = styled.img`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
`;

const UserName = styled.span`
  color: white;
  font-size: 0.875rem;
`;

export const LogoutButton = styled(Button)`
  padding: 0;
  display: flex;
  align-items: center;
`;

const UserProfile = ({ user, onSignOut }) => (
  <Tooltip content="Sign Out">
    <LogoutButton clear onClick={onSignOut}>
      <UserAvatar
        src={user.photoURL || guestAvatar}
        alt=""
        role="presentation"
      />
      <UserName>{user.displayName}</UserName>
    </LogoutButton>
  </Tooltip>
);

UserProfile.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  user: CustomPropTypes.user.isRequired
};

export default UserProfile;
