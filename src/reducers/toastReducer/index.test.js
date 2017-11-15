import { TOAST_DISMISS, TOAST_RAISE } from "actions/toast";
import toastReducer from "reducers/toastReducer";

const createAction = (type, payload = {}) => {
  return {
    type: type,
    payload
  };
};

const createState = (intialState = {}) => {
  return Object.assign({}, ...intialState);
};

describe("toastReducer", () => {
  it("should initially return an empty list of toasts", () => {
    expect(toastReducer(createState(), createAction(undefined))).toEqual({});
  });

  describe("raising and dismissing toasts", () => {
    let payload;

    beforeEach(() => {
      payload = {
        id: "Toast1",
        message: "Hello",
        undoAction: "actionName",
        context: {
          additionalData: true
        }
      };
    });

    it("should be possible to raise a toast", () => {
      expect(
        toastReducer(createState(), createAction(TOAST_RAISE, payload))
      ).toMatchObject({
        Toast1: {
          message: "Hello",
          undoAction: "actionName",
          context: {
            additionalData: true
          }
        }
      });
    });

    it("should be able to dismiss a raised toast", () => {
      expect(
        toastReducer(
          createState({
            Toast1: {
              message: "Hello",
              undoAction: "actionName",
              context: {
                additionalData: true
              }
            }
          }),
          createAction(TOAST_DISMISS, payload)
        )
      ).toEqual({});
    });
  });
});
