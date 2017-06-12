import { mapStateToProps } from "containers/Breadcrumb";

import { getRouteByPath } from "routes";

describe("containers/Breadcrumb", () => {
  const state = {
    survey: {
      meta: {
        title: "My survey"
      }
    }
  };

  it("should render a Home link and page title, should one exist", function() {
    const routes = [
      {
        path: "/",
        title: "Home"
      },
      {
        path: "/create",
        title: "Create a survey"
      }
    ];
    const { breadcrumbs } = mapStateToProps({
      ...state,
      router: {
        location: {
          pathname: routes[1].path
        }
      }
    });

    expect(breadcrumbs[0].title).toEqual(getRouteByPath("/", routes).title);
    expect(breadcrumbs[1].title).toEqual(routes[1].title);
  });

  it("should render a Home link and the current survey title", function() {
    const { breadcrumbs } = mapStateToProps({
      ...state,
      router: {
        location: {
          pathname: "/my-survey"
        }
      }
    });
    expect(breadcrumbs[0].title).toEqual(getRouteByPath("/").title);
    expect(breadcrumbs[1].title).toEqual(state.survey.meta.title);
  });
});
