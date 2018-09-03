import React from "react";
import { shallow } from "enzyme";

import BaseTabs from "./";

describe("Base Tabs", () => {
  const tabs = [
    { id: 1, title: "Example 1", render: () => <div>Hello 1</div> },
    { id: 2, title: "Example 2", render: () => <div>Hello 2</div> },
    { id: 3, title: "Example 3", render: () => <div>Hello 3</div> }
  ];
  const renderButton = (props, { title }) => (
    <button {...props}>{title}</button>
  );

  it("should render the basic layout", () => {
    const wrapper = shallow(
      <BaseTabs
        buttonRender={renderButton}
        tabs={tabs}
        activeId={1}
        onChange={() => {}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the active content as defined by the activeId", () => {
    const activeId = 2;
    const wrapper = shallow(
      <BaseTabs
        buttonRender={renderButton}
        tabs={tabs}
        activeId={activeId}
        onChange={() => {}}
      />
    );
    const activeContent = wrapper.find(`[aria-labelledby=${activeId}]`);
    expect(activeContent.text()).toEqual(`Hello ${activeId}`);
  });

  it("call onChange with the id of the button clicked", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <BaseTabs
        buttonRender={renderButton}
        tabs={tabs}
        activeId={1}
        onChange={onChange}
      />
    );

    const button = wrapper.find("button[aria-controls=2]");
    button.simulate("click");

    expect(onChange).toHaveBeenCalledWith(2);
  });
});
