import React from "react";
import { storiesOf } from "@kadira/storybook";
import Nav from "./index";
import { MemoryRouter } from "react-router-dom";

storiesOf("Nav", module).add("Default", () => (
  <MemoryRouter>
    <Nav />
  </MemoryRouter>
));
