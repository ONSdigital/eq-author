import React from "react";
import { shallow } from "enzyme";
import { UnconnectedHeader, StyledUserProfile } from "components/Header";

describe("components/Header", () => {
  let env;
  let now;
  let handleSignOut;
  let raiseToast;

  beforeEach(() => {
    env = process.env;
    process.env = {
      REACT_APP_PUBLISHER_URL: "http://eq-publisher/publish",
      REACT_APP_GO_LAUNCH_A_SURVEY_URL: "http://go-launch-a-survey/quick-launch"
    };

    now = Date.now;
    Date.now = () => 1507793425522;

    handleSignOut = jest.fn();

    raiseToast = jest.fn();
  });

  const render = (props = {}) =>
    shallow(
      <UnconnectedHeader
        raiseToast={raiseToast}
        signOutUser={handleSignOut}
        {...props}
      />
    );

  afterEach(() => {
    process.env = env;
    Date.now = now;
  });

  it("renders correctly ", () => {
    expect(render()).toMatchSnapshot();
  });

  describe("when there is a questionnaire", () => {
    const questionnaire = { id: "1", title: "Questionnaire" };
    let wrapper;

    let tempExecCommand;
    beforeEach(() => {
      wrapper = render({ questionnaire });
      tempExecCommand = document.execCommand;
      document.execCommand = jest.fn();
    });
    afterEach(() => {
      document.execCommand = tempExecCommand;
    });

    it("should render breadcrumbs", () => {
      const breadcrumb = wrapper.find("Breadcrumb");

      expect(breadcrumb).toHaveLength(1);
      expect(breadcrumb).toMatchSnapshot();
    });

    it("should render a preview button", () => {
      const previewButton = wrapper.find({ title: "Preview" });

      expect(previewButton).toHaveLength(1);
      expect(previewButton).toMatchSnapshot();
    });

    it("should render a share button", () => {
      const shareButton = wrapper.find({ title: "Share" });

      expect(shareButton).toHaveLength(1);
      expect(shareButton).toMatchSnapshot();
    });

    it("should let a user copy", () => {
      wrapper.find({ test: "Share" }).simulate("click");
      expect(document.execCommand).toHaveBeenCalledWith("copy");
    });
  });

  describe("when the user is signed in", () => {
    const user = {
      displayName: "Foo Bar",
      email: "foo@b.ar",
      photoURL: "http://foo.b.ar/photo.jpg"
    };

    it("should render user's profile", () => {
      const wrapper = render({ questionnaire: undefined, user });
      const profile = wrapper.find(StyledUserProfile);

      expect(profile).toHaveLength(1);
      expect(profile).toMatchSnapshot();
    });

    it("should allow user to sign out", () => {
      const wrapper = render({ questionnaire: undefined, user });
      wrapper.find(StyledUserProfile).simulate("signOut");

      expect(handleSignOut).toHaveBeenCalled();
    });
  });
});
