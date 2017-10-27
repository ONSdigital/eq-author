import React from "react";
import { mount } from "enzyme";

import {
  Dropdown,
  MenuItem,
  MenuList,
  SubMenuItem,
  MenuScrollPane
} from "components/Menu";

let handleItemChosen, wrapper, item;

describe("components/Menu", () => {
  beforeEach(() => {
    handleItemChosen = jest.fn();
    item = { id: "123" };

    wrapper = mount(
      <Dropdown>
        <MenuScrollPane>
          <MenuList>
            <MenuItem id="item-1" item={item} onItemChosen={handleItemChosen}>
              1. Fusce Egestas Tristique Porta Sollicitudin
            </MenuItem>
            <MenuItem id="item-2" item={item} onItemChosen={handleItemChosen}>
              2. Fusce Egestas Tristique Porta Sollicitudin
            </MenuItem>
            <MenuItem id="item-3" item={item} onItemChosen={handleItemChosen}>
              3. Fusce Egestas Tristique Porta Sollicitudin
            </MenuItem>
            <SubMenuItem
              menu={
                <Dropdown>
                  <MenuList>
                    <MenuItem
                      id="item-4.1"
                      item={item}
                      onItemChosen={handleItemChosen}
                    >
                      4.1. Fusce Egestas Tristique Porta Sollicitudin
                    </MenuItem>
                    <MenuItem
                      id="item-4.2"
                      item={item}
                      onItemChosen={handleItemChosen}
                    >
                      4.2. Ligula Consectetur Ullamcorper Cursus Ligula
                      Consectetur Ullamcorper Cursus
                    </MenuItem>
                  </MenuList>
                </Dropdown>
              }
            >
              4. Fusce Egestas Tristique Porta Sollicitudin
            </SubMenuItem>
          </MenuList>
        </MenuScrollPane>
      </Dropdown>
    );
  });

  it("should render a Menu", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle items being chosen by calling onItemChosen with id prop", () => {
    const menuItem = wrapper.find(MenuItem).first();
    menuItem.simulate("click");
    expect(handleItemChosen).toHaveBeenCalledWith(item);
  });
});
