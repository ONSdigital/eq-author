import styled from "styled-components";

const ScrollPane = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  -webkit-background-clip: text;
  transition: background-color 0.2s;

  ::-webkit-scrollbar-thumb {
    border-radius: 0;
    box-shadow: none;
    background-color: inherit;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.18);

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.4);
    }
  }

  ::-webkit-scrollbar-track {
    border-radius: 0;
    box-shadow: none;
    background: transparent;
    display: none;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
`;

export default ScrollPane;
