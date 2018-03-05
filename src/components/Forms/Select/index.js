import styled from "styled-components";

import Icon from "./icon.svg";
import { sharedStyles } from "components/Forms/css";
import withChangeHandler from "components/Forms/withChangeHandler";

export const SimpleSelect = styled.select`
  ${sharedStyles};
  display: inline-block;
  padding: 0.5em 1.5em 0.5em 0.5em;
  background: white url('${Icon}') no-repeat right 0.5em center;
  appearance: none;
`;

export default withChangeHandler(SimpleSelect);
