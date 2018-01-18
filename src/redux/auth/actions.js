import { pick } from "lodash";

export const SIGN_IN_USER = "SIGN_IN_USER";
export const SIGN_OUT_USER = "SIGN_OUT_USER";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";

export const signInUser = user => {
  if (process.env.REACT_APP_USE_FULLSTORY === "true") {
    window.FS.identify(user.email, {
      displayName: user.displayName
    });
  }

  return {
    type: SIGN_IN_USER,
    payload: pick(user, "displayName", "email", "photoURL")
  };
};

export const signedOutUser = () => {
  return {
    type: SIGN_OUT_USER
  };
};

export const signOutUser = () => (dispatch, getState, { auth }) => {
  if (process.env.REACT_APP_USE_FULLSTORY === "true") {
    window.FS.identify(false);
  }

  return auth.signOut().then(() => dispatch(signedOutUser()));
};

export const verifyAuthStatus = () => (dispatch, getState, { auth }) => {
  return auth.onAuthStateChanged(user =>
    dispatch(user ? signInUser(user) : signOutUser())
  );
};
