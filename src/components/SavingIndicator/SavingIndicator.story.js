import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import SavingIndicator from "components/SavingIndicator";

import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";

const Padding = styled.div`
  padding: 2em;
`;

const store = configureStore(null, null, {
  saving: { pendingRequestCount: 1 }
});

storiesOf("AutoSave", module)
  .addDecorator(story => (
    <Provider store={store}>
      <Padding>{story()}</Padding>
    </Provider>
  ))
  .add("Primary", () => <SavingIndicator />);
