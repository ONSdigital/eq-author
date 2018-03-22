import React from "react";
import { shallow } from "enzyme";

import RoutingStatement from "./RoutingStatement";

import sections from "./mockstate";

let wrapper, mockHandlers;

describe("components/RoutingStatement", () => {
  beforeEach(() => {
    mockHandlers = {
      onAddCondition: jest.fn()
    };

    wrapper = shallow(
      <RoutingStatement
        id="test"
        sections={sections}
        selectedPage={sections[0].pages[0]}
        {...mockHandlers}
      >
        <div>I am a child</div>
      </RoutingStatement>
    );
  });

  it("should render consistently", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call addCondition handler when 'add' button is clicked", () => {
    wrapper.find('[data-test="btn-add"]').simulate("click");
    expect(mockHandlers.onAddCondition).toHaveBeenCalled();
  });
});
