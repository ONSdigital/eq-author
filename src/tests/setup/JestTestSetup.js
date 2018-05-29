import "animation-frame-polyfill";
import "jest-styled-components";

import Enzyme from "enzyme";
import Adapter from "./ReactSixteenAdapter";

Enzyme.configure({ adapter: new Adapter() });

export {};
