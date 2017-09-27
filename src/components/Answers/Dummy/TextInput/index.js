import styled from "styled-components";
import { sharedStyles } from "components/Forms/css";

const DummyTextInput = styled.div`
  ${sharedStyles};
  padding: 1.2em 1.2em 1.2em 2em;
  position: relative;
  background-color: transparent;
  z-index: 0;
  width: 50%;
`;

export default DummyTextInput;
