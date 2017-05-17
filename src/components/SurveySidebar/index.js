import React from "react";
import { flow } from "lodash";
import PropTypes from "prop-types";
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

SurveySidebar.propTypes = {
  sections: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  answers: PropTypes.object.isRequired
}

export default SurveySidebar;
