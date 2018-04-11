import React from "react";
import { shallow, mount } from "enzyme";
import { UnconnectedSavingIndicator } from "components/SavingIndicator";

jest.useFakeTimers();

describe("SavingIndicator", () => {
  let currentTime;

  beforeEach(() => {
    currentTime = 0;
  });

  const advanceByTime = amount => {
    currentTime += amount;
    jest.runTimersToTime(currentTime);
  };

  it("should render when starting saving", () => {
    const wrapper = shallow(<UnconnectedSavingIndicator isSaving={false} />);
    wrapper.setProps({ isSaving: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should show spinner for at least one second", () => {
    const wrapper = mount(<UnconnectedSavingIndicator isSaving={false} />);

    wrapper.setProps({ isSaving: true });
    advanceByTime(250);
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ isSaving: false });
    expect(wrapper).toMatchSnapshot();

    advanceByTime(1000);
    expect(wrapper).toMatchSnapshot();
  });

  it("should hide immediately if saving for more than one second", () => {
    const wrapper = shallow(<UnconnectedSavingIndicator isSaving={false} />);

    wrapper.setProps({ isSaving: true });
    expect(wrapper).toMatchSnapshot();
    advanceByTime(1500);

    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ isSaving: false });

    expect(wrapper).toMatchSnapshot();
  });
});
