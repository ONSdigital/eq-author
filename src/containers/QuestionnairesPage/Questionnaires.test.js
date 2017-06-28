import React from "react";
import Questionnaires from "./Questionnaires";
import { mountWithRouter } from "tests/utils/mountWithRouter";

let wrapper;

describe("containers/Questionnaires", () => {
  beforeEach(() => {
    wrapper = mountWithRouter(<Questionnaires />);
  });

  it("should render a 'Create Questionnaire' button", () => {
    expect(wrapper.find("#btn-create-questionnaire").length).toBeTruthy();
  });
});
