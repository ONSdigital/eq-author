import React from "react";
import MovePageModal from ".";
import { shallow } from "enzyme";
import { times } from "lodash";

const buildPages = (sectionNumber, count) =>
  times(count, i => ({
    id: `${sectionNumber}.${i + 1}`,
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

const sel = id => `[data-test="${id}"]`;
const getSectionModal = wrapper => wrapper.find(sel("section-modal"));
const getSectionSelect = wrapper => wrapper.find(sel("section-select"));
const getPositionModal = wrapper => wrapper.find(sel("position-modal"));
const getPositionSelect = wrapper => wrapper.find(sel("position-select"));

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

    expect(getSectionModal(wrapper).prop("isOpen")).toBe(true);
  });

  it("opens position select modal when correct button is clicked", () => {
    const wrapper = createWrapper();

    wrapper
      .find("MovePageModal__Trigger")
      .last()
      .simulate("click");

    expect(getPositionModal(wrapper).prop("isOpen")).toBe(true);
  });

  it("should close section select modal on confirm", () => {
    const wrapper = createWrapper();

    wrapper
      .find("MovePageModal__Trigger")
      .first()
      .simulate("click");

    getSectionModal(wrapper).simulate("change", {
      value: questionnaire.sections[1].id
    });

    getSectionModal(wrapper).simulate("confirm", {
      preventDefault: jest.fn()
    });

    expect(getSectionModal(wrapper).prop("isOpen")).toBe(false);
  });

  it("should update selected section on change", () => {
    const wrapper = createWrapper();
    const selectedSection = questionnaire.sections[1];

    getSectionSelect(wrapper).simulate("change", { value: selectedSection.id });

    expect(getSectionSelect(wrapper).prop("value")).toBe(selectedSection.id);
  });

  it("should update selected position on change", () => {
    const wrapper = createWrapper();

    getSectionSelect(wrapper).simulate("change", { value: "2" });
    getPositionSelect(wrapper).simulate("change", { value: "1" });

    expect(getPositionSelect(wrapper)).toMatchSnapshot();
  });

  it("closes all modals and calls onMovePage when confirmed", () => {
    const onMovePage = jest.fn();
    const onClose = jest.fn();
    const selectedSection = questionnaire.sections[1];
    const position = 1;

    const wrapper = createWrapper({ onMovePage, onClose });

    getSectionSelect(wrapper).simulate("change", { value: selectedSection.id });
    getPositionSelect(wrapper).simulate("change", { value: String(position) });
    getPositionModal(wrapper).simulate("confirm", {
      preventDefault: jest.fn()
    });

    expect(getPositionModal(wrapper).prop("isOpen")).toBe(false);
    expect(onClose).toHaveBeenCalled();

    expect(onMovePage).toHaveBeenCalledWith({
      id: currentPage.id,
      sectionId: selectedSection.id,
      position
    });
  });
});
