import { mapMutateToProps, createUpdater } from "./withDeleteOption";
import fragment from "graphql/answerFragment.graphql";

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
      const id = `MultipleChoiceAnswer${answer.id}`;
      const writeFragment = jest.fn();
      const readFragment = jest.fn(() => answer);

      const updater = createUpdater(option.id, answer.id);
      updater({ readFragment, writeFragment });

      expect(readFragment).toHaveBeenCalledWith({ id, fragment });
      expect(writeFragment).toHaveBeenCalledWith({
        id,
        fragment,
        data: answer
      });
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
          variables: {
            input: { id: option.id }
          }
        })
      );
    });
  });
});
