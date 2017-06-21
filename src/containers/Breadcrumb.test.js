import { mapStateToProps, mapResultsToProps } from "containers/Breadcrumb";

describe("containers/Breadcrumb", () => {
  it("should map router location state to pathname", function() {
    const { pathname } = mapStateToProps({
      router: {
        location: {
          pathname: "/create"
        }
      }
    });

    expect(pathname).toEqual("/create");
  });

  it("should use title of route when on /create", () => {
    expect(
      mapResultsToProps({
        data: {},
        ownProps: { pathname: "/create" }
      })
    ).toEqual({
      breadcrumbs: [
        { title: "Home", pathname: "/" },
        { title: "New questionnaire", pathname: "/create" }
      ]
    });
  });

  it("should use title of questionnaire when on /design", () => {
    expect(
      mapResultsToProps({
        data: { questionnaire: { title: "My Questionnaire" } },
        ownProps: { pathname: "/design" }
      })
    ).toEqual({
      breadcrumbs: [
        { title: "Home", pathname: "/" },
        { title: "My Questionnaire", pathname: "/design" }
      ]
    });
  });
});
