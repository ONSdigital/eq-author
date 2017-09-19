import {
  mapMutateToProps,
  createUpdater,
  redirectToNewPage,
  fragment
} from "./withCreatePage";

describe("containers/QuestionnaireDesignPage/withCreatePage", () => {
  const page = {
    id: 3,
    title: "My Page"
  };
  const section = {
    id: 2,
    title: "My Section",
    pages: [page]
  };
  const questionnaire = {
    id: 1,
    title: "My Questionnaire",
    sections: [section]
  };

  let history, mutate, result, newPage, ownProps;

  beforeEach(() => {
    history = {
      push: jest.fn()
    };

    newPage = {
      id: 22,
      title: "New Page",
      section: {
        id: section.id
      }
    };

    result = {
      data: {
        createQuestionPage: newPage
      }
    };

    ownProps = {
      history,
      questionnaireId: questionnaire.id
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("createUpdater", () => {
    it("should update the cache pass and the result to be the correct page", () => {
      const id = `Section${section.id}`;
      const readFragment = jest.fn(() => section);
      const writeFragment = jest.fn();

      const updater = createUpdater(section.id);
      updater({ readFragment, writeFragment }, result);

      expect(readFragment).toHaveBeenCalledWith({ id, fragment });
      expect(writeFragment).toHaveBeenCalledWith({
        id,
        fragment,
        data: section
      });
      expect(section.pages).toContain(newPage);
    });
  });

  describe("redirectToNewPage", () => {
    it("should redirect to the correct url", () => {
      redirectToNewPage(ownProps)(result);

      expect(history.push).toHaveBeenCalledWith(
        `/questionnaire/${questionnaire.id}/design/${section.id}/${newPage.id}`
      );
    });
  });

  describe("mapMutateToProps", () => {
    let props;
    beforeEach(() => {
      props = mapMutateToProps({ ownProps, mutate });
    });

    it("should have a onAddPage prop", () => {
      expect(props.onAddPage).toBeInstanceOf(Function);
    });

    it("should respond with an optimisticResponse", () => {
      return props.onAddPage(section.id).then(() => {
        expect(mutate.mock.calls[0][0]).toMatchObject({
          optimisticResponse: {
            createQuestionPage: {
              id: -1
            }
          }
        });
      });
    });

    it("should redirect", () => {
      return props.onAddPage(section.id).then(() => {
        expect(history.push).toHaveBeenCalled();
      });
    });
  });
});
