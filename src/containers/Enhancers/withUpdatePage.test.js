import { mapMutateToProps } from "./withUpdatePage";

describe("Enhancers > withUpdatePage", () => {
  describe("mapMutateToProps", () => {
    let props;
    let mutate;
    let page;

    beforeEach(() => {
      mutate = jest.fn();
      props = mapMutateToProps({ mutate });
      page = jest.fn();
    });

    it("should have an onUpdatePage prop", () => {
      expect(props.onUpdatePage).toBeInstanceOf(Function);
    });

    it("should call mutate", () => {
      props.onUpdatePage(page);

      expect(mutate).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: page
        })
      );
    });
  });
});
