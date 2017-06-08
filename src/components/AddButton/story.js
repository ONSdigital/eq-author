import React from "react";
import { storiesOf } from "@kadira/storybook";
import AddButton from "components/AddButton";
import styled from "styled-components";
import { darkBlue } from "constants/theme/colours";

const Sidebar = styled.div`
  background: ${darkBlue};
  padding: 0.5em;
  max-width: 15em;
`;

storiesOf("AddButton", module)
  .addDecorator(story => <Sidebar>{story()}</Sidebar>)
  .add("Default", () => (
    <Sidebar>
      <AddButton editLabel="Group name">Add a group</AddButton>
    </Sidebar>
  ));
