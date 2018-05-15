import {
  mapResultsToProps,
  mapPropToOptions
} from "./withAvailableRoutingDestinations";

const availableRoutingDestinations = [
  {
    id: "1",
    __typename: "QuestionPage"
  },
  {
    id: "2",
    __typename: "Section"
  },
  {
    id: "2",
    __typename: "Section"
  }
];

describe("containers/withAvailableRoutingDestinations", () => {
  describe("mapResultsToProps", () => {
    it("should handle loading", () => {
      const props = mapResultsToProps({
        data: { loading: true, availableRoutingDestinations: undefined }
      });
      expect(props).toMatchSnapshot();
    });

    it("should handle availableRoutingDestinations data", () => {
      const props = mapResultsToProps({
        data: { loading: false, availableRoutingDestinations }
      });

      expect(props).toMatchSnapshot();
    });
  });

  describe("mapOptionsToProps", () => {
    it("should pass pageId as a variable", () => {
      const options = mapPropToOptions({ pageId: "1" });
      expect(options).toMatchSnapshot();
    });
  });
});
