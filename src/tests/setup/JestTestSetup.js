import "animation-frame-polyfill";
import "jest-styled-components";

import Enzyme from "enzyme";

// TODO : replace with official Adapter, once enzyme properly supports new Context API (and portals?)
// see: https://github.com/airbnb/enzyme/pull/1513
import Adapter from "./ReactSixteenAdapter";

Enzyme.configure({ adapter: new Adapter() });

export {};
