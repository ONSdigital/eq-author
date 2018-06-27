import React from "react";
import { shallow } from "enzyme";
import { UnconnectedOfflineBanner } from "components/OfflineBanner";

describe("OfflineBanner", () => {
  it("should render when offline", () => {
    const wrapper = shallow(<UnconnectedOfflineBanner isOnline={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render when user is online", () => {
    const wrapper = shallow(<UnconnectedOfflineBanner isOnline />);
    expect(wrapper).toMatchSnapshot();
  });
});
