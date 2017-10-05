import createReducer from "reducers";

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

describe("reducers", () => {
  it("should combine reducers", () => {
    const reducer = createReducer({ counter });
    let state = reducer({ counter: 1 }, { type: "INCREMENT" });
    expect(state).toMatchSnapshot();
  });
});
