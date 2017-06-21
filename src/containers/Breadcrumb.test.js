import { mapStateToProps } from "containers/Breadcrumb";

import { getRouteByPath } from "routes";

describe("containers/Breadcrumb", () => {
  const state = {
    questionnaire: {
      meta: {
        title: "My questionnaire"
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
        title: "New questionnaire"
      }
    ];

    const { pathname, route } = mapStateToProps({
      ...state,
      router: {
        location: {
          pathname: routes[1].path
        }
      }
    });

    expect(pathname).toEqual(routes[1].path);
    expect(route).toEqual(routes[1]);
  });

  it("should render a Home link and the current questionnaire title", function() {
    const { breadcrumbs } = mapStateToProps({
      ...state,
      router: {
        location: {
          pathname: "/my-questionnaire"
        }
      }
    });
    expect(breadcrumbs[0].title).toEqual(getRouteByPath("/").title);
    expect(breadcrumbs[1].title).toEqual(state.questionnaire.meta.title);
  });
});
