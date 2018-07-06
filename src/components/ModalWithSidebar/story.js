import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ModalWithSidebar from "components/ModalWithSidebar";
import { Nav } from "components/ModalWithSidebar/Nav";
import { Field, Label, Input } from "components/Forms";

const navItems = [
  {
    id: "1",
    title: "Cursus Bibendum",
    active: true
  },
  {
    id: "2",
    title: "Euismod Ridiculus Parturient",
    active: false
  },
  {
    id: "3",
    title: "Tellus Dolor",
    active: false
  },
  {
    id: "4",
    title: "Dolor Inceptos Mattis Pharetra",
    active: false
  }
];

const ModalNav = (
  <Nav title="Navigation" items={navItems} onClick={action("Navigate")}>
    Hello
  </Nav>
);

storiesOf("ModalWithSidebar", module).add("ModalWithSidebar", () => (
  <ModalWithSidebar
    title="Cursus Bibendum"
    sidebarChildren={ModalNav}
    onClose={action("Close")}
    isOpen
  >
    <Field>
      <Label htmlFor="input">LABEL</Label>
      <Input id="input" />
    </Field>
  </ModalWithSidebar>
));
