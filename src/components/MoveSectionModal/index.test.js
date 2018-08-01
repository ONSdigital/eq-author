import React from "react";
import MoveSectionModal from ".";
import { shallow } from "enzyme";
import { buildQuestionnaire } from "tests/utils/createMockQuestionnaire";

describe("MoveSectionModal", () => {
  const questionnaire = buildQuestionnaire();
  const currentSection = questionnaire.sections[0];

  const createWrapper = (props = {}, render = shallow) =>
    render(
      <MoveSectionModal
        isOpen
        onClose={jest.fn()}
        questionnaire={questionnaire}
        section={currentSection}
        onMoveSection={jest.fn()}
        {...props}
      />
    );

  it("should render", () => {
    expect(createWrapper()).toMatchSnapshot();
  });
});
