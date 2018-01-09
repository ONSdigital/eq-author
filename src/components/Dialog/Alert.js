import styled from "styled-components";
import PropTypes from "prop-types";

const alertIcon = require("./icons/alert.min.svg");

export const AlertList = styled.ul`
  margin: 0;
`;

AlertList.propTypes = {
  children: PropTypes.node
};

export const Alert = styled.li`
  list-style-image: url(${alertIcon});
  padding: 1em 0;
  font-size: 0.75em;
`;

Alert.propTypes = {
  children: PropTypes.node
};
