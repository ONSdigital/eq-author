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
  const user = {
    displayName: "foo",
    email: "foo@bar.com",
    photoURL: "http://foo.org/bar.jpg"
  };
  let store, auth;

  beforeEach(() => {
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

    describe("fullstory", () => {
      let FS;

      beforeEach(() => {
        process.env.REACT_APP_USE_FULLSTORY = "true";

        window.FS = FS = { identify: jest.fn() };
      });

      afterEach(() => {
        delete process.env.REACT_APP_USE_FULLSTORY;
        delete window.FS;
      });

      it("should anonymise user", () => {
        return store.dispatch(signOutUser()).then(() => {
          expect(FS.identify).toHaveBeenCalledWith(false);
        });
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
      changeHandler(user);

      expect(store.getActions()).toEqual([signInUser(user)]);
    });

    it("should not sign-in user if determined to be unauthenticated", () => {
      changeHandler();

      expect(store.getActions()).toEqual([signedOutUser()]);
    });

    describe("fullstory", () => {
      let FS;

      beforeEach(() => {
        process.env.REACT_APP_USE_FULLSTORY = "true";

        window.FS = FS = { identify: jest.fn() };
      });

      afterEach(() => {
        delete process.env.REACT_APP_USE_FULLSTORY;
        delete window.FS;
      });

      it("should identify user with full story", () => {
        changeHandler(user);

        expect(FS.identify).toHaveBeenCalledWith(user.email, {
          displayName: user.displayName
        });
      });
    });
  });
});
