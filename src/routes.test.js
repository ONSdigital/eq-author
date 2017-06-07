import { routes, getRouteByPath } from "routes";

describe("routes", () => {
  it("should export an array of route definitions", () => {
    expect(routes.filter(route => !route.path).length).toBe(0);
  });

  it("should provide a helper for finding a route via a path", () => {
    const mockRoutes = [
      {
        path: "/find-me",
        title: "Find Me"
      },
      {
        path: "/ignore-me",
        title: "Ignore me"
      }
    ];
    expect(getRouteByPath("/find-me", mockRoutes).title).toEqual("Find Me");
  });
});
