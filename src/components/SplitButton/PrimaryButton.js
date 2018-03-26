import styled from "styled-components";
import { colors } from "constants/theme";

const PrimaryButton = styled.button`
  padding: 0.7em;
  background: ${colors.white};
  border: 1px solid ${colors.blue};
  color: ${colors.blue};
  font-weight: bold;
  border-radius: 4px 0 0 4px;
  border-right: 0;
  flex: 1;
  cursor: pointer;

  &:focus {
    color: ${colors.white};
    background-color: ${colors.blue};
    outline: 0;
  }
`;

export default PrimaryButton;
