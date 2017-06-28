import React from "react";
import { storiesOf } from "@storybook/react";
import { Tabs, TabPanel, TabList, TabTitle } from "./index";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1em;
  max-width: 30em;
`;

storiesOf("Tabs", module)
  .addDecorator(story => <Wrapper>{story()}</Wrapper>)
  .add("Default", () =>
    <Tabs>
      <TabList>
        <TabTitle>Tab 1</TabTitle>
        <TabTitle>Tab 2</TabTitle>
        <TabTitle>Tab 3</TabTitle>
      </TabList>
      <TabPanel>
        <h2>Panel 1</h2>
        <p>
          Maecenas sed diam eget risus varius blandit sit amet non magna. Sed
          posuere consectetur est at lobortis. Maecenas faucibus mollis
          interdum.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          Donec id elit non mi porta gravida at eget metus. Nulla vitae elit
          libero, a pharetra augue.
        </p>
      </TabPanel>
      <TabPanel>
        <h2>Panel 2</h2>
        <p>
          Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id
          ligula porta felis euismod semper. Donec ullamcorper nulla non metus
          auctor fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
          eget lacinia odio sem nec elit.
        </p>
      </TabPanel>
      <TabPanel>
        <h2>Panel 3</h2>
        <p>
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Curabitur
          blandit tempus porttitor. Donec sed odio dui. Nulla vitae elit libero,
          a
          pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </p>
      </TabPanel>
    </Tabs>
  );
