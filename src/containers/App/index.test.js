import React from "react";

import App from "./index";
import { shallow } from "enzyme";

import createHistory from "history/createHashHistory";

const history = createHistory({
  basename: process.env.REACT_APP_BASE_NAME
});

const store = {
  getState: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn()
};

const client = {};

describe("containers/App", () => {
  it("should render", () => {
    const wrapper = shallow(
      <App store={store} history={history} client={client} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
