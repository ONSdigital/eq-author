import { END_REQUEST, START_REQUEST } from "redux/saving/actions";
import saveReducer from "redux/saving/reducer";
import createAction from "tests/utils/createAction";
import createState from "tests/utils/createState";

describe("saveReducer", () => {
  it("should initially return an empty saving state", () => {
    expect(saveReducer(createState(), createAction(undefined))).toEqual({});
  });
  it("Should be able to show saving", () => {
    expect(
      saveReducer(
        createState({ pendingRequestCount: 0 }),
        createAction(START_REQUEST)
      )
    ).toMatchObject({
      pendingRequestCount: 1
    });
  });
  it("Should be able to hide saving", () => {
    expect(
      saveReducer(
        createState({
          pendingRequestCount: 1
        }),
        createAction(END_REQUEST)
      )
    ).toMatchObject({
      pendingRequestCount: 0
    });
  });
});
