import React from "react";
import { shallow } from "enzyme";
import IconButton from "components/IconButton";
import addPageIcon from "containers/QuestionnaireDesignPage/icon-add-page.svg";

const createWrapper = (props, render = shallow) => {
  return render(<IconButton {...props} />);
};

describe("IconButton", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      icon: addPageIcon,
      title: "Icon button text",
      uniqueHash: "Fixed random hash for snapshot test"
    };
    wrapper = createWrapper(props);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render icon only", () => {
    wrapper = createWrapper({ ...props, iconOnly: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle click event", () => {
    wrapper.find("IconButton__StyledButton").simulate("click");
    expect(props.onClick).toHaveBeenCalled();
  });
});
