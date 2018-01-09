import PropTypes from "prop-types";
import styled from "styled-components";

import moveIcon from "./icons/move.min.svg";
import deleteIcon from "./icons/delete.min.svg";

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

export default DialogIcon;
