import React from "react";

import { Sidebar, SidebarSection } from "components/Sidebar";
import { TreeMenu } from "components/TreeMenu";

const SurveySidebar = ({ sections, questions, answers, ...actions }) => (
  <Sidebar>
    <SidebarSection
      title={"Sections"}
      onAddClick={e => {
        e.preventDefault();
        actions.addItem();
      }}
    />
    <TreeMenu
      sections={sections}
      questions={questions}
      answers={answers}
      {...actions}
    />
  </Sidebar>
);

export default SurveySidebar;
