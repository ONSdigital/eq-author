import React from "react";
import PlainModal, { Body, Fieldset, Title } from "./PlainModal";
import { shallow } from "enzyme";

describe("MovePageModal/PlainModal", () => {
  it("should render", () => {
    const wrapper = shallow(
      <PlainModal isOpen onClose={jest.fn()}>
        <Body>
          <Fieldset>
            <Title>Test</Title>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reiciendis dignissimos, ipsum laboriosam autem ipsa corrupti dicta
              tempore provident magnam saepe consectetur molestiae illo ad
              temporibus, quasi animi rem aliquid omnis.
            </p>
          </Fieldset>
        </Body>
      </PlainModal>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
