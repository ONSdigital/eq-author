import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "constants/theme";

const Dropdown = styled.div`
  background: ${colors.white};
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24);
  border-radius: 0 2px 2px 0;
  max-width: ${props => props.maxWidth};
`;

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string
};

Dropdown.defaltProps = {
  maxWidth: "20em"
};

export default Dropdown;
