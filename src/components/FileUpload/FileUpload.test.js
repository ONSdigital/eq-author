import React from "react";
import { shallow } from "enzyme";
import FileUpload from "./";

it("renders without crashing", () => {
  shallow(<FileUpload><button>Hello</button></FileUpload>);
});
