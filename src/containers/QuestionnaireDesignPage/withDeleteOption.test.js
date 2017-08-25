import { mapMutateToProps, createUpdater } from "./withDeleteOption";

describe("containers/QuestionnaireDesignPage/withDeleteOption", () => {
  let mutate, result, answer, option;

  beforeEach(() => {
    option = {
      id: 123
    };

    answer = {
      id: 456,
      label: "foo",
      description: "bar",
      options: [option]
    };

    result = {
      data: {
        deleteOption: answer
      }
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("createUpdater", () => {
    it("should update the cache pass and the result to be the correct page", () => {
      const writeFragment = jest.fn();
      const readFragment = jest.fn().mockImplementation(() => answer);
      const id = `MultipleChoiceAnswer${answer.id}`;
      const updater = createUpdater(option.id, answer.id);

      updater({ readFragment, writeFragment });

      expect(readFragment).toHaveBeenCalledWith(
        expect.objectContaining({ id })
      );

      expect(writeFragment).toHaveBeenCalledWith(
        expect.objectContaining({
          id,
          data: answer
        })
      );

      expect(answer.options).not.toContain(option);
    });
  });

  describe("mapMutateToProps", () => {
    let props;
    beforeEach(() => {
      props = mapMutateToProps({ mutate });
    });

    it("should have a onDeleteOption prop", () => {
      expect(props.onDeleteOption).toBeInstanceOf(Function);
    });

    it("should call mutate", () => {
      props.onDeleteOption(option.id, answer.id);

      expect(mutate).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { id: option.id }
        })
      );
    });
  });
});
