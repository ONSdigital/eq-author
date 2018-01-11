import React from "react";
import { shallow } from "enzyme";
import { UnconnectedHeader } from "components/Header";
import UserProfile from "components/UserProfile";

describe("components/Header", () => {
  let env;
  let now;
  let handleSignOut;

  beforeEach(() => {
    env = process.env;
    process.env = {
      REACT_APP_PUBLISHER_URL: "http://eq-publisher/publish",
      REACT_APP_GO_LAUNCH_A_SURVEY_URL: "http://go-launch-a-survey/quick-launch"
    };

    now = Date.now;
    Date.now = () => 1507793425522;

    handleSignOut = jest.fn();
  });

  const render = (props = {}) =>
    shallow(<UnconnectedHeader signOutUser={handleSignOut} {...props} />);

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

    beforeEach(() => {
      wrapper = render({ questionnaire });
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

    it("should render an export button", () => {
      const exportButton = wrapper.find({ title: "Export" });

      expect(exportButton).toHaveLength(1);
      expect(exportButton).toMatchSnapshot();
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
      const profile = wrapper.find(UserProfile);

      expect(profile).toHaveLength(1);
      expect(profile).toMatchSnapshot();
    });

    it("should allow user to sign out", () => {
      const wrapper = render({ questionnaire: undefined, user });
      wrapper.find(UserProfile).simulate("signOut");

      expect(handleSignOut).toHaveBeenCalled();
    });
  });
});
