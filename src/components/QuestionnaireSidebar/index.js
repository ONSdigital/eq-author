import React from "react";
import { flow } from "lodash";
import PropTypes from "prop-types";
import { Sidebar, SidebarSection } from "components/Sidebar";
import { TreeMenu } from "components/TreeMenu";

const preventDefault = e => e.preventDefault();

const QuestionnaireSidebar = ({ sections, questions, answers, ...actions }) =>
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
  </Sidebar>;

QuestionnaireSidebar.propTypes = {
  sections: PropTypes.objectOf(PropTypes.object),
  questions: PropTypes.objectOf(PropTypes.object),
  answers: PropTypes.objectOf(PropTypes.object)
};

export default QuestionnaireSidebar;
