import React from "react";
import { shallow } from "enzyme";
import CommentsButton from "./CommentsButton";

describe("CommentsButton", () => {
  it("should render when there are no unread comments", () => {
    const wrapper = shallow(<CommentsButton hasUnread={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when there are unread comments", () => {
    const wrapper = shallow(<CommentsButton hasUnread />);
    expect(wrapper).toMatchSnapshot();
  });
});
