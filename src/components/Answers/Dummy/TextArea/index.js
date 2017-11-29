import styled from "styled-components";
import PropTypes from "prop-types";
import { sharedStyles } from "components/Forms/css";

const DummyTextArea = styled.div`
  ${sharedStyles};
  padding: 1.2em 1.2em 1.2em 2em;
  position: relative;
  background-color: transparent;
  width: 50%;
  height: ${props => props.rows + 2}em;
`;

DummyTextArea.propTypes = {
  rows: PropTypes.number
};

DummyTextArea.defaultPropTypes = {
  rows: 1
};

export default DummyTextArea;
