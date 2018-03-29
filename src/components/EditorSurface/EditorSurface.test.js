import React from "react";
import { shallow } from "enzyme";
import EditorSurface from "./";
import PropTypes from "prop-types";

const option = {
  __typename: "Option",
  id: "0",
  label: "",
  description: ""
};

const answer = {
  __typename: "MultipleChoiceAnswer",
  id: "1",
  type: "Checkbox",
  options: [option]
};

const page = {
  __typename: "Page",
  id: "2",
  title: "",
  answers: [answer]
};

const section = {
  __typename: "Section",
  id: "3",
  title: "",
  pages: [page]
};

describe("EditorSurface", () => {
  let wrapper, mockMutations;

  const createWrapper = (props = {}, render = shallow, renderOpts = {}) => {
    const defaultOptions = {
      context: {
        client: { query: jest.fn(), readQuery: jest.fn() },
        store: {
          subscribe: jest.fn(),
          dispatch: jest.fn(),
          getState: jest.fn()
        }
      },
      childContextTypes: { client: PropTypes.object, store: PropTypes.object }
    };

    return render(
      <EditorSurface
        section={section}
        page={page}
        {...mockMutations}
        focused={"Section3"}
        {...props}
      />,
      {
        ...defaultOptions,
        ...renderOpts
      }
    );
  };

  beforeEach(() => {
    mockMutations = {
      onUpdateSection: jest.fn(),
      onDeleteSection: jest.fn(),
      onUpdatePage: jest.fn(),
      onDeletePage: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    };
  });

  it("should render", () => {
    wrapper = createWrapper({}, shallow, {
      disableLifecycleMethods: true
    });
    expect(wrapper).toMatchSnapshot();
  });
});
