import React from "react";
import { PropertiesPanel } from "components/PropertiesPanel";
import { shallow } from "enzyme";
import { merge } from "lodash";

const createWrapper = (props, render = shallow) => {
  return render(<PropertiesPanel {...props} />);
};

const questionnaire = {
  id: "1",
  __typename: "Questionnaire"
};

const page = {
  id: "1",
  __typename: "Page",
  type: "Questionnaire",
  answers: []
};

const props = {
  orderMin: 1,
  orderMax: 10,
  page,
  questionnaire,
  focusOnSection: jest.fn(),
  selectedSection: ""
};

describe("PropertiesPanel", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper(props);
  });

  it("should render when there are no answers", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when there are answers", () => {
    const withAnswers = merge({}, props, {
      page: {
        answers: [
          {
            id: "1",
            __typename: "Answer"
          },
          {
            id: "2",
            __typename: "Answer"
          }
        ]
      }
    });

    wrapper = createWrapper(withAnswers);

    expect(wrapper).toMatchSnapshot();
  });
});
