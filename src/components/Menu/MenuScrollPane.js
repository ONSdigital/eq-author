import ScrollPane from "components/ScrollPane";
import styled from "styled-components";

const MenuScrollPane = styled(ScrollPane)`
  max-height: ${props => props.maxHeight};
  overflow-y: auto;
  overflow-x: hidden;

  &:hover {
    background-color: rgba(0, 0, 0, 0.18);

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  ::-webkit-scrollbar {
    width: 7px;
  }
`;

export default MenuScrollPane;
