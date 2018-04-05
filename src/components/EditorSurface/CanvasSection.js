import styled from "styled-components";
import { rgba } from "polished";

import { colors, shadow } from "constants/theme";

export const BasicSection = styled.div`
  padding: 2em 2.5em;
  background-color: white;
  position: relative;
  box-shadow: ${shadow};
  margin-bottom: 1em !important;
`;

const CanvasSection = styled(BasicSection)`
  &:hover {
    outline: 1px solid ${rgba(colors.blue, 0.5)};
  }

  &:focus-within {
    box-shadow: none;
    outline: 1px solid transparent;
    outline-color: ${colors.blue};
    transition: outline-color 100ms ease-in;
  }
`;

export default CanvasSection;
