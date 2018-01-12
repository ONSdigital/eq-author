import styled from "styled-components";
import { colors, radius } from "constants/theme";
import auth, { providers } from "auth";
import { FirebaseAuth } from "react-firebaseui";

const SignInForm = styled(FirebaseAuth)`
  .firebaseui-card-content {
    padding: 0;
  }

  .firebaseui-idp-button {
    border-radius: ${radius};
    border: 1px solid ${colors.borders};
    box-shadow: none;
  }

  .firebaseui-id-page-callback {
    display: none;
  }
`;

SignInForm.defaultProps = {
  firebaseAuth: auth,
  uiConfig: {
    signInFlow: "popup",
    signInOptions: providers,
    callbacks: {
      signInSuccess: () => false // Avoid redirects after sign-in.
    }
  }
};

export default SignInForm;
