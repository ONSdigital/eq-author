import {
  mapMutateToProps,
  createUpdater,
  redirectToNewSection
} from "./withCreateSection";
import fragment from "graphql/questionnaireFragment.graphql";
import { getLink } from "utils/UrlUtils";

describe("containers/QuestionnaireDesignPage/withCreateSection", () => {
  const questionnaire = {
    id: "1",
    title: "My Questionnaire",
    sections: []
  };

  let history, mutate, result, newSection, newPage, ownProps;

  beforeEach(() => {
    history = {
      push: jest.fn()
    };

    newPage = {
      id: "5"
    };

    newSection = {
      id: "4",
      title: "New Section",
      pages: [newPage]
    };

    result = {
      data: {
        createSection: newSection
      }
    };

    ownProps = {
      questionnaireId: questionnaire.id,
      history
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("createUpdater", () => {
    it("should update the cache pass and the result to be the correct page", () => {
      const id = `Questionnaire${questionnaire.id}`;
      const readFragment = jest.fn(() => questionnaire);
      const writeFragment = jest.fn();

      const updater = createUpdater(questionnaire.id);
      updater({ readFragment, writeFragment }, result);

      expect(readFragment).toHaveBeenCalledWith({ id, fragment });
      expect(writeFragment).toHaveBeenCalledWith({
        id,
        fragment,
        data: questionnaire
      });
      expect(questionnaire.sections).toContain(newSection);
    });
  });

  describe("redirectToNewSection", () => {
    it("should redirect to the correct url", () => {
      redirectToNewSection(ownProps)(result);

      expect(history.push).toHaveBeenCalledWith(
        getLink(questionnaire.id, newSection.id)
      );
    });
  });

  describe("mapMutateToProps", () => {
    let props;

    beforeEach(() => {
      props = mapMutateToProps({ ownProps, mutate });
    });

    it("should have a onAddSection prop", () => {
      expect(props.onAddSection).toBeInstanceOf(Function);
    });

    it("should redirect", () => {
      return props.onAddSection().then(result => {
        expect(result).toEqual(newSection);
        expect(history.push).toHaveBeenCalled();
      });
    });
  });
});
