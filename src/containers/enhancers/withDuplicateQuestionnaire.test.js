import { mapMutateToProps } from "./withDuplicateQuestionnaire";

const nextId = previousId => `${parseInt(previousId, 10) + 1}`;

describe("withDuplicateQuestionnaire", () => {
  let ownProps, history, match, props, mutate, questionnaireId, expectedResult;

  beforeEach(() => {
    ownProps = {
      history,
      match
    };

    questionnaireId = "1";

    expectedResult = {
      data: {
        duplicateQuestionnaire: {
          id: nextId(questionnaireId)
        }
      }
    };
  });

  describe("mapMutateToProps", () => {
    beforeEach(() => {
      mutate = jest.fn(() => Promise.resolve(expectedResult));
      props = mapMutateToProps({ ownProps, mutate });
    });

    it("supplies an onDuplicateQuestionnaire prop", () => {
      expect(props.onDuplicateQuestionnaire).toBeInstanceOf(Function);
    });

    describe("onDuplicateQuestionnaire", () => {
      it("provides the necessary arguments to mutate", async () => {
        await props.onDuplicateQuestionnaire(questionnaireId);

        expect(mutate).toHaveBeenCalledWith({
          variables: {
            input: {
              id: questionnaireId
            }
          }
        });
      });

      it("should return promise that resolves to duplicateSection result", async () => {
        const result = await props.onDuplicateQuestionnaire(questionnaireId);
        return expect(result).toBe(expectedResult.data.duplicateQuestionnaire);
      });
    });
  });
});
