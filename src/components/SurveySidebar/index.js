import React from 'react';
import {Sidebar, SidebarSection} from 'components/Sidebar';
import {TreeMenu} from 'components/TreeMenu';

const actions = {};

const SurveySidebar = ({sections, questions, answers}) => (
  <Sidebar>
    <SidebarSection title={'Sections'} />
    <TreeMenu
      sections={sections}
      questions={questions}
      answers={answers}
      {...actions}
    />
  </Sidebar>
);

export default SurveySidebar;
