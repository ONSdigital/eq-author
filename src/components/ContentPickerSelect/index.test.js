import React from "react";
import { shallow } from "enzyme";

import {
  UnwrappedContentPickerSelect,
  ContentSelectButton
} from "components/ContentPickerSelect";
import ContentPickerModal from "components/ContentPickerModal";

import { CURRENCY, NUMBER } from "constants/answer-types";

const render = (props, render = shallow) => {
  return render(<UnwrappedContentPickerSelect {...props} />);
};

describe("ContentPickerSelect", () => {
  let props, wrapper;

  beforeEach(() => {
    props = {
      match: {
        params: {
          questionnaireId: "1"
        }
      },
      data: {
        questionnaire: {
          id: "1",
          metadata: [],
          sections: []
        }
      },
      onSubmit: jest.fn(),
      answerTypes: [NUMBER, CURRENCY],
      selectedContentDisplayName: "foobar",
      name: "contentPicker",
      loading: false,
      error: false
    };

    wrapper = render(props);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should disable select button correctly", () => {
    wrapper = render({ ...props, loading: true });
    expect(wrapper).toMatchSnapshot();

    wrapper = render({ ...props, error: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should correctly handle picker submit", () => {
    const selectedItem = { id: 1, displayName: "New selected answer" };
    wrapper.find(ContentPickerModal).simulate("submit", selectedItem);

    expect(props.onSubmit).toHaveBeenCalledWith({
      name: props.name,
      value: selectedItem
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should correctly handle picker close", () => {
    wrapper.setState({ isPickerOpen: true });
    wrapper.find(ContentPickerModal).simulate("close");
    expect(wrapper).toMatchSnapshot();
  });

  it("should correctly handle picker open", () => {
    wrapper.find(ContentSelectButton).simulate("click");
    expect(wrapper).toMatchSnapshot();
  });
});
