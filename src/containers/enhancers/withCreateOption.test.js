import { mapMutateToProps, createUpdater } from "./withCreateOption";

describe("containers/QuestionnaireDesignPage/withCreateOption", () => {
  const answer = {
    id: 1,
    options: []
  };

  let mutate, result, newOption;

  beforeEach(() => {
    newOption = {
      id: 2
    };

    result = {
      data: {
        createOption: newOption
      }
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("createUpdater", () => {
    it("should update the cache pass and the result to be the correct page", () => {
      const writeFragment = jest.fn();
      const readFragment = jest.fn().mockImplementation(() => answer);

      const updater = createUpdater(answer.id);
      updater({ readFragment, writeFragment }, result);

      expect(readFragment).toHaveBeenCalledWith(
        expect.objectContaining({ id: `MultipleChoiceAnswer${answer.id}` })
      );

      expect(writeFragment).toHaveBeenCalledWith(
        expect.objectContaining({
          id: `MultipleChoiceAnswer${answer.id}`,
          data: answer
        })
      );

      expect(answer.options).toContain(newOption);
    });
  });

  describe("mapMutateToProps", () => {
    let props;

    beforeEach(() => {
      props = mapMutateToProps({ mutate });
    });

    it("should have a onAddOption prop", () => {
      expect(props.onAddOption).toBeInstanceOf(Function);
    });

    it("should call mutate", () => {
      return props.onAddOption(answer.id).then(() => {
        expect(mutate).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: { answerId: answer.id }
          })
        );
      });
    });
  });
});