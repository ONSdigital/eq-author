import React from "react";
import PropTypes from "prop-types";
import { injectGlobal, ThemeProvider } from "styled-components";
import theme, { colors } from "constants/theme";
import "normalize.css";

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 1em;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }
  body {
    font-family: 'Lato', sans-serif;
    color: ${colors.text};
  }
  input,
  select,
  textarea {
    padding: 1em;
    width: 100%;
    display: block;
    border-radius: 2px;
    border: 1px solid ${colors.borders};
    background: white;
    line-height: 1;
    &:focus {
      outline: none;
      border: 1px solid ${colors.lightBlue};
    }
  }
  select,
  textarea,
  input[type="text"] {
    appearance: none;
  }
`;

const App = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
