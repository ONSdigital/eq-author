import styled from "styled-components";
import { colors } from "constants/theme";

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  position: relative;
  background: ${colors.white};
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  min-width: 25em;
`;

export default Dialog;
