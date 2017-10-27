import React from "react";
import { shallow } from "enzyme";

import QuestionnaireMenu from "components/QuestionnaireMenu";

let handleItemChosen, wrapper;

const answer = { id: "4", label: "Answer" };
const page = { id: "2", title: "Page", answers: [answer] };
const section = { id: "3", title: "Section", pages: [page] };
const questionnaire = { id: "1", title: "Questionnaire", sections: [section] };

describe("components/QuestionnaireMenu", () => {
  beforeEach(() => {
    handleItemChosen = jest.fn();
    wrapper = shallow(
      <QuestionnaireMenu
        questionnaire={questionnaire}
        onItemChosen={handleItemChosen}
      />
    );
  });

  it("should render a QuestionnaireMenu", () => {
    // TODO: work out how to properly test this - it only renders one level down, so most code is uncovered
    expect(wrapper).toMatchSnapshot();
  });
});
