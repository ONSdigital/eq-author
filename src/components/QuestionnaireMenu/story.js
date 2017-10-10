import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Menu from "./index";
import { MenuButton as RMLMenuButton } from "react-menu-list";
import styled from "styled-components";

import schema from "./schema.json";
import jsf from "json-schema-faker";

const MenuButton = styled(RMLMenuButton)`
  border: none;
  padding: 0.5em;
  margin: 2em;
`;

const { questionnaire } = jsf(schema);

const menu = (
  <Menu questionnaire={questionnaire} onItemChosen={action(`ItemChosen`)} />
);

storiesOf("QuestionnaireMenu", module).add("With Menu Button", () => (
  <MenuButton menu={menu}>Menu</MenuButton>
));
