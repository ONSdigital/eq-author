import React from "react";
import { flow } from "lodash";
import { Sidebar, SidebarSection } from "components/Sidebar";
import { TreeMenu } from "components/TreeMenu";

const preventDefault = e => e.preventDefault();

const SurveySidebar = ({ sections, questions, answers, ...actions }) => (
  <Sidebar>
    <SidebarSection
      title={"Sections"}
      onAddClick={flow(preventDefault, actions.addItem)}
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
