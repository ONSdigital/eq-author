import React from "react";
import PropTypes from "prop-types";
import { injectGlobal, ThemeProvider } from "styled-components";
import theme, { colors } from "constants/theme";

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
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
    overflow: hidden;
    color: ${colors.text};
  }

  input,
  select,
  textarea,
  button {
    font-family: inherit;
  }
  
  /**
   * TODO - remove/refactor
   * Slack feedback component override for testing.
   */
  #slack-feedback {
    #SlackFeedback {
      bottom : 0;
      margin : 3px;
      margin-right : 246px;
      
      .SlackFeedback--tabs,
      .SlackFeedback--checkbox-label,
      .SlackFeedback--label,
      .SlackFeedback--checkbox {
        display : none !important;
      }
      
      button.submit {
        background: #056C99 !important;
        border-radius : 2px;
      }
      
      .SlackFeedback--header {
        background-color : #35414D;
      }
      
      .SlackFeedback--trigger {
        border-radius : 2px;
        background-color : #056C99;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        color : #fff;
        // color : #e2e2e2;
        border : none;
      }
    }
  }
`;

const App = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
