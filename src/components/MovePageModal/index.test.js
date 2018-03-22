import React from "react";
import MovePageModal from ".";
import { shallow } from "enzyme";
import { times } from "lodash";
import PositionSelectModal from "./PositionSelectModal";
import SectionSelectModal from "./SectionSelectModal";

const buildPages = (sectionNumber, count) =>
  times(count, i => ({
    id: `${i + 1}`,
    title: `Page ${sectionNumber}.${i + 1}`,
    position: i
  }));

const buildSections = count =>
  times(count, i => ({
    id: `${i + 1}`,
    title: `Section ${i + 1}`,
    pages: buildPages(i + 1, 2)
  }));

const buildQuestionnaire = () => ({
  id: "1",
  sections: buildSections(2)
});

describe("MovePageModal/MovePageModal", () => {
  const questionnaire = buildQuestionnaire();
  const currentSection = questionnaire.sections[0];
  const currentPage = currentSection.pages[0];

  const createWrapper = (props = {}, render = shallow) =>
    render(
      <MovePageModal
        isOpen
        onClose={jest.fn()}
        questionnaire={questionnaire}
        section={currentSection}
        page={currentPage}
        selectedPosition={0}
        onMovePage={jest.fn()}
        {...props}
      />
    );

  it("should render", () => {
    expect(createWrapper()).toMatchSnapshot();
  });

  it("opens section select modal when correct button is clicked", () => {
    const wrapper = createWrapper();

    wrapper
      .find("MovePageModal__Trigger")
      .first()
      .simulate("click");

    expect(wrapper.find(SectionSelectModal).prop("isOpen")).toBe(true);
  });

  it("opens position select modal when correct button is clicked", () => {
    const wrapper = createWrapper();

    wrapper
      .find("MovePageModal__Trigger")
      .last()
      .simulate("click");

    expect(wrapper.find("PositionSelectModal").prop("isOpen")).toBe(true);
  });

  it("should close section select modal on change", () => {
    const wrapper = createWrapper();

    wrapper
      .find("MovePageModal__Trigger")
      .first()
      .simulate("click");

    wrapper.find(SectionSelectModal).simulate("change", {
      value: questionnaire.sections[1].id
    });

    expect(wrapper.find(SectionSelectModal).prop("isOpen")).toBe(false);
  });

  it("should update selected section on change", () => {
    const wrapper = createWrapper();
    const selectedSection = questionnaire.sections[1];

    wrapper
      .find(SectionSelectModal)
      .simulate("change", { value: selectedSection.id });

    expect(wrapper.find(SectionSelectModal).prop("selectedSection")).toBe(
      selectedSection
    );
  });

  it("should update selected position on change", () => {
    const wrapper = createWrapper();

    wrapper.find(SectionSelectModal).simulate("change", { value: "2" });
    wrapper.find(PositionSelectModal).simulate("change", { value: "1" });

    expect(wrapper.find(PositionSelectModal).prop("selectedPosition")).toBe(1);
    expect(wrapper.find(PositionSelectModal).prop("pages")).toMatchSnapshot();
  });

  it("closes all modals and calls onMovePage when confirmed", () => {
    const onMovePage = jest.fn();
    const onClose = jest.fn();
    const selectedSection = questionnaire.sections[1];
    const position = 1;

    const wrapper = createWrapper({ onMovePage, onClose });

    wrapper
      .find(SectionSelectModal)
      .simulate("change", { value: selectedSection.id });
    wrapper
      .find(PositionSelectModal)
      .simulate("change", { value: String(position) });
    wrapper
      .find(PositionSelectModal)
      .simulate("confirm", { preventDefault: jest.fn() });

    expect(wrapper.find(PositionSelectModal).prop("isOpen")).toBe(false);
    expect(onClose).toHaveBeenCalled();

    expect(onMovePage).toHaveBeenCalledWith({
      id: currentPage.id,
      sectionId: selectedSection.id,
      position
    });
  });
});
