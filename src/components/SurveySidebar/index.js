import React from 'react';
import {Sidebar, SidebarSection} from 'components/Sidebar';
import {TreeMenu} from 'components/TreeMenu';

const actions = {};

const SurveySidebar = ({sections}) => (
  <Sidebar>
    <SidebarSection title={'Sections'} />
    <TreeMenu sections={sections} {...actions} />
  </Sidebar>
);

export default SurveySidebar;
