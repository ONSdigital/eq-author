import { mapMutateToProps } from "./withUpdateSection";

describe("Enhancers > withUpdateSection", () => {
  describe("mapMutateToProps", () => {
    let props;
    let mutate;
    let section;

    beforeEach(() => {
      mutate = jest.fn();
      props = mapMutateToProps({ mutate });
      section = jest.fn();
    });

    it("should have an onUpdateSection prop", () => {
      expect(props.onUpdateSection).toBeInstanceOf(Function);
    });

    it("should call mutate", () => {
      props.onUpdateSection(section);

      expect(mutate).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: section
        })
      );
    });
  });
});
