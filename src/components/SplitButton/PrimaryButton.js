import styled from "styled-components";
import Button from "../Button";

const PrimaryButton = styled(Button).attrs({ variant: "secondary" })`
  border-radius: 4px 0 0 4px;
  border-right: 0;
  flex: 1;
  position: relative;
  z-index: 2;
`;

export default PrimaryButton;
