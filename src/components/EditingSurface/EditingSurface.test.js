import React from "react";
import { mount, shallow } from "enzyme";
import EditingSurface from "./";

const option = {
  id: 0,
  label: "",
  description: ""
};

const answer = {
  id: 1,
  type: "Checkbox",
  options: [option]
};

const page = {
  id: 2,
  title: "",
  answers: [answer]
};

const section = {
  id: 3,
  title: "",
  pages: [page]
};

describe("EditingSurface", () => {
  let wrapper;
  let mockMutations;

  const createWrapper = (props, render = mount) => {
    return render(
      <EditingSurface
        section={section}
        page={page}
        {...mockMutations}
        {...props}
      />
    );
  };

  beforeEach(() => {
    mockMutations = {
      onUpdateSection: jest.fn(),
      onUpdatePage: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    };
    wrapper = createWrapper();
  });

  it("should render", () => {
    wrapper = createWrapper({}, shallow);

    expect(wrapper).toMatchSnapshot();
  });

  it("should fail invalid 'focused' prop value", () => {
    expect(() => {
      createWrapper({
        focused: "I AM NOT A VALID VALUE"
      });
    }).toThrow();
  });

  xdescribe("focus behaviour", () => {
    it("should focus on empty section title upon mount", () => {
      // TODO This logic needs to be re-introduced.
      expect(document.activeElement.name).toEqual("section.title");
    });

    it("should focus on empty page title when section title is not empty", () => {
      // TODO This logic needs to be re-introduced.
      wrapper = createWrapper({
        section: { title: "Section" },
        page: { id: "3", title: "" }
      });
      expect(document.activeElement.name).toEqual("page.title");
    });

    it("should move focus to empty section title upon navigation to new page", () => {
      // TODO This logic needs to be re-introduced.
      expect(document.activeElement.name).toEqual("section.title");
    });

    it("should move focus to empty page title upon navigation to new page", () => {
      // TODO This logic needs to be re-introduced.
      wrapper = createWrapper({
        section: { title: "Section" },
        page: { id: "1", title: "I have a title" },
        answers: [answer]
      });

      expect(document.activeElement.name).toEqual("section.title");

      wrapper.setProps({ page: { id: "2", title: "" } });

      expect(document.activeElement.name).toEqual("page.title");
      expect(document.activeElement.value).toEqual("");
    });

    it("should focus on a designated field when a transition is complete", () => {
      // TODO This logic needs to be re-introduced.
      const input = { focus: jest.fn() };
      const node = {
        querySelectorAll: jest.fn(() => [input])
      };

      wrapper = createWrapper({}, shallow);
      wrapper.find(Answer).simulate("entered", node);
      expect(input.focus).toHaveBeenCalled();
    });
  });
});
