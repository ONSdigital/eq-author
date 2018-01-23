import styled from "styled-components";

const TextBtn = styled.button.attrs({
  type: "button"
})`
  background-color: transparent;
  border: none;
  display: inline-block;
  color: #1ca8f4;
  background: transparent;
  padding: 0.2em 0.5em;
  font-size: 0.8rem;
  font-family: inherit;
  font-size: 0.9rem;
  border-radius: 3px;
  -webkit-font-smoothing: antialiased;
  transition: all 300ms ease-out;

  &:hover,
  &:focus {
    outline: none;
    opacity: 1;
    background #f8f8f8;
    color: #178ccc;
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export default TextBtn;
