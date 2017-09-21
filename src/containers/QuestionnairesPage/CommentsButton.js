import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "components/Button";

import CommentsSvg from "./commentsIcon.svg";

const handleClick = () => {
  alert("Not implemented yet.");
};

const StyledSpan = styled.span`position: relative;`;

const StyledButton = styled(Button)`
  width: 18px;
  height: 18px;
  padding: 0.5em;
  background: url(${CommentsSvg}) no-repeat;
  background-size: contain;
  border: 0;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    transition: opacity 150ms ease-in;
  }
`;

const UnreadCommentsNotifier = styled.span`
  border-radius: 100%;
  background: #006c97;
  width: 8px;
  height: 8px;
  position: absolute;
  top: -2px;
  right: -4px;
`;

const CommentsButton = ({ hasUnread }) =>
  <StyledSpan>
    <StyledButton title={"Click to see comments"} onClick={handleClick} />
    {hasUnread && <UnreadCommentsNotifier title={"You have unread comments"} />}
  </StyledSpan>;

CommentsButton.propTypes = {
  hasUnread: PropTypes.bool.isRequired
};

export default CommentsButton;
