import React from 'react'
import {injectGlobal, ThemeProvider} from 'styled-components'
import theme from 'constants/theme'
import 'normalize.css'

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
    color: ${theme.colorText};
  }
  input,
  select,
  textarea {
    padding: 1em;
    width: 100%;
    display: block;
    border-radius: 2px;
    border: 1px solid ${theme.colorBorders};
    background: white;
    appearance: none;
    line-height: 1;
    &:focus {
      outline: none;
      border: 1px solid ${theme.colorLightBlue};
    }
  }
`

export default ({children}) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)
