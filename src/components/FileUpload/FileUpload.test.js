import React from "react";

import { mount } from "enzyme";
import FileUpload from "./";

let fileUpload, handleChange;

beforeEach(() => {
  handleChange = jest.fn();
  fileUpload = mount(
    <FileUpload onFileSelected={handleChange}>
      <button>Hello</button>
    </FileUpload>
  );
});

it("renders an input", () => {
  expect(fileUpload.find("input").length).toEqual(1);
});

it("passes file object onChange", () => {
  const file = { name: "foo.json" };
  const event = { target: { files: [file] } };

  fileUpload.find("input").simulate("change", event);

  expect(handleChange).toHaveBeenCalledWith(file);
});

it("allows clicks on child components to trigger file input", () => {
  const handleClick = jest.fn();

  fileUpload.find("input").getNode().onclick = handleClick;
  fileUpload.find("button").simulate("click");

  expect(handleClick).toHaveBeenCalled();
});
