import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  signOutUser,
  signInUser,
  signedOutUser,
  verifyAuthStatus
} from "./actions";
import { SynchronousPromise } from "synchronous-promise";

describe("auth actions", () => {
  let store, auth;

  beforeEach(() => {
    const user = { displayName: "foo" };

    auth = {
      signOut: jest.fn(() => SynchronousPromise.resolve()),
      onAuthStateChanged: jest.fn()
    };

    const middleware = [thunk.withExtraArgument({ auth })];
    const mockStore = configureStore(middleware);
    store = mockStore({
      auth: { user }
    });
  });

  describe("signOutUser", () => {
    it("should sign user out", () => {
      return store.dispatch(signOutUser()).then(() => {
        expect(auth.signOut).toHaveBeenCalled();
        expect(store.getActions()).toEqual([signedOutUser()]);
      });
    });
  });

  describe("verifyAuthStatus", () => {
    let changeHandler, result;

    beforeEach(() => {
      auth.onAuthStateChanged.mockImplementation(handler => {
        changeHandler = handler;
        return "FOOBAR";
      });

      result = store.dispatch(verifyAuthStatus());
    });

    it("should return result of onAuthStateChanged", () => {
      expect(result).toBe("FOOBAR");
    });

    it("should start listening to auth changes", () => {
      expect(auth.onAuthStateChanged).toHaveBeenCalledTimes(1);
    });

    it("should sign-in user if determined to be authenticated", () => {
      const user = { displayName: "foo" };
      changeHandler(user);

      expect(store.getActions()).toEqual([signInUser(user)]);
    });

    it("should not sign-in user if determined to be unauthenticated", () => {
      changeHandler();

      expect(store.getActions()).toEqual([signedOutUser()]);
    });
  });
});
