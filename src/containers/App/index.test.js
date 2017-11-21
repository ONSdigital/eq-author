import React from "react";

import App, { Routes } from "./index";
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

const client = {
  query: jest.fn(),
  readQuery: jest.fn()
};

describe("containers/App", () => {
  it("should render", () => {
    const wrapper = shallow(
      <App store={store} history={history} client={client} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe("Routes", () => {
    it("should render ", () => {
      const wrapper = shallow(<Routes isSignedIn history={history} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
