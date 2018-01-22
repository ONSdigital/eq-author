import PropTypes from "prop-types";
import styled from "styled-components";

import moveIcon from "./icons/icon-dialog-move.svg";
import deleteIcon from "./icons/icon-dialog-delete.svg";

const icons = {
  move: moveIcon,
  delete: deleteIcon
};

const DialogIcon = styled.div`
  background: url(${props => icons[props.icon]}) no-repeat center;
  width: 3em;
  height: 3em;
`;

DialogIcon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons))
};

export default styled(DialogIcon)`
  flex-grow: 0;
  margin-right: 1em;
`;
