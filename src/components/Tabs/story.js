import React from "react";
import { storiesOf } from "@kadira/storybook";
import { Tabs, TabPanel, TabList, TabTitle } from "./index";

TabPanel.displayName = "TabPanel";
TabList.displayName = "TabList";

storiesOf("Tabs", module).add("Default", () => (
  <Tabs>
    <TabList>
      <TabTitle>Tab 1</TabTitle>
      <TabTitle>Tab 2</TabTitle>
      <TabTitle>Tab 3</TabTitle>
    </TabList>
    <TabPanel>
      Panel 1
    </TabPanel>
    <TabPanel>
      Panel 2
    </TabPanel>
    <TabPanel>
      Panel 3
    </TabPanel>
  </Tabs>
));
