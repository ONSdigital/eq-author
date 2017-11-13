import { colors } from "constants/theme";

import styled from "styled-components";

import selectIcon from "./icon-select.svg";
import FluidSelect from "./FluidSelect";

const ComparatorSelect = styled(FluidSelect)`
  border: none;
  width: 3em;
  height: 2em;
  margin: 4px 0;
  padding-left: 0.5em;
  
  background: none;
  font-size: 0.9em;
  background: white url('${selectIcon}') no-repeat right 0.5em center;
  appearance: none;
  color: ${colors.text};
  -webkit-font-smoothing: antialiased;
  &:focus {
    outline: none;
    background-color: #f3f3f3;
  }
`;

export default ComparatorSelect;
