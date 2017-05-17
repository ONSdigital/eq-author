import React from "react";

import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

export const mountWithRouter = child =>
  mount(<MemoryRouter>{child}</MemoryRouter>);
