import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Dropdown, MenuItem, MenuList, SubMenuItem } from "components/Menu";

import { MenuButton as RMLMenuButton } from "react-menu-list";
import styled from "styled-components";

const MenuButton = styled(RMLMenuButton)`
  border: none;
  padding: 0.5em;
  margin: 2em;
`;

const handleItemChosen = action("ItemChosen");

storiesOf("Menu", module)
  .add("Single level / single lines", () => (
    <MenuButton
      menu={
        <Dropdown>
          <MenuList>
            <MenuItem id="item-1" onItemChosen={handleItemChosen} item="item-1">
              1. Fusce Egestas Tristique Porta Sollicitudin
            </MenuItem>
            <MenuItem id="item-2" onItemChosen={handleItemChosen} item="item-2">
              2. Ligula Consectetur Ullamcorper Cursus Ligula Consectetur
              Ullamcorper Cursus
            </MenuItem>
            <MenuItem id="item-3" onItemChosen={handleItemChosen} item="item-3">
              3. Donec ullamcorper nulla non metus auctor fringilla.
            </MenuItem>
          </MenuList>
        </Dropdown>
      }
    >
      Menu
    </MenuButton>
  ))
  .add("Single level / multiline", () => (
    <MenuButton
      menu={
        <Dropdown maxWidth="15em">
          <MenuList>
            <MenuItem
              id="item-1"
              lines={2}
              onItemChosen={handleItemChosen}
              item="item-1"
            >
              1. Fusce Egestas Tristique Porta Sollicitudin
            </MenuItem>
            <MenuItem
              id="item-2"
              lines={2}
              onItemChosen={handleItemChosen}
              item="item-2"
            >
              2. Ligula Consectetur Ullamcorper Cursus Ligula Consectetur
              Ullamcorper Cursus
            </MenuItem>
            <MenuItem
              id="item-3"
              lines={2}
              onItemChosen={handleItemChosen}
              item="item-3"
            >
              3. Donec ullamcorper nulla non metus auctor fringilla.
            </MenuItem>
          </MenuList>
        </Dropdown>
      }
    >
      Menu
    </MenuButton>
  ))
  .add("With submenus", () => (
    <MenuButton
      menu={
        <Dropdown>
          <MenuList>
            <MenuItem id="item-1" onItemChosen={handleItemChosen} item="item-1">
              1. Sem Adipiscing Lorem
            </MenuItem>
            <MenuItem id="item-2" onItemChosen={handleItemChosen} item="item-2">
              2. Fermentum Vehicula Ridiculus
            </MenuItem>
            <SubMenuItem
              menu={
                <Dropdown>
                  <MenuList>
                    <MenuItem
                      id="item-3.1"
                      onItemChosen={handleItemChosen}
                      item="item-3"
                    >
                      3.1 Inceptos Etiam Vehicula Vestibulum
                    </MenuItem>
                    <MenuItem
                      id="item-3.2"
                      onItemChosen={handleItemChosen}
                      item="item-3"
                    >
                      3.2 Fusce Tristique Commodo Vehicula
                    </MenuItem>
                    <MenuItem
                      id="item-3.3"
                      onItemChosen={handleItemChosen}
                      item="item-3"
                    >
                      3.3 Justo Malesuada Parturient Mollis Fusce
                    </MenuItem>
                  </MenuList>
                </Dropdown>
              }
            >
              3. Vestibulum Inceptos Cras Ornare
            </SubMenuItem>
          </MenuList>
        </Dropdown>
      }
    >
      Menu
    </MenuButton>
  ))
  .add("Maximum height, with scroll", () => (
    <MenuButton
      menu={
        <Dropdown>
          <MenuList maxHeight={"7.2em"}>
            <MenuItem id="item-1" onItemChosen={handleItemChosen} item="item-1">
              1. Fusce Egestas Tristique Porta Sollicitudin
            </MenuItem>
            <MenuItem id="item-2" onItemChosen={handleItemChosen} item="item-2">
              2. Magna Mollis Elit
            </MenuItem>
            <MenuItem id="item-3" onItemChosen={handleItemChosen} item="item-3">
              3. Malesuada Sit Adipiscing Inceptos
            </MenuItem>
            <MenuItem id="item-4" onItemChosen={handleItemChosen} item="item-4">
              4. Adipiscing Venenatis Ipsum
            </MenuItem>
            <MenuItem id="item-5" onItemChosen={handleItemChosen} item="item-5">
              5. Pellentesque Egestas Mattis Fusce
            </MenuItem>
            <MenuItem id="item-6" onItemChosen={handleItemChosen} item="item-6">
              6. Justo Quam Purus
            </MenuItem>
            <MenuItem id="item-7" onItemChosen={handleItemChosen} item="item-7">
              7. Tellus Ligula
            </MenuItem>
            <MenuItem id="item-8" onItemChosen={handleItemChosen} item="item-8">
              8. Fermentum Tellus Amet Egestas
            </MenuItem>
            <MenuItem id="item-9" onItemChosen={handleItemChosen} item="item-9">
              9. Ridiculus Tortor Cras
            </MenuItem>
          </MenuList>
        </Dropdown>
      }
    >
      Menu
    </MenuButton>
  ));
