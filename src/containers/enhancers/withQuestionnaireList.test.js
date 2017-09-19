import { mapResultsToProps } from "./withQuestionnaireList";

describe("withQuestionnaireList", () => {
  describe("mapResultsToProps", () => {
    it("should return loading if data still loading", () => {
      const result = mapResultsToProps({
        data: {
          loading: true
        }
      });

      expect(result).toEqual({
        loading: true
      });
    });

    it("should return an empty questionnaires list when there's no data", () => {
      const result = mapResultsToProps({
        data: {
          loading: false,
          questionnaires: []
        }
      });

      expect(result).toMatchObject({
        loading: false,
        questionnaires: []
      });
    });

    it("should return a single questionnaire", () => {
      const result = mapResultsToProps({
        data: {
          loading: false,
          questionnaires: [
            {
              id: 1
            }
          ]
        }
      });

      expect(result).toMatchObject({
        loading: false,
        questionnaires: [
          {
            id: 1,
            status: "Unpublished",
            comments: {
              unread: true,
              count: 1
            },
            actions: {
              delete: true
            }
          }
        ]
      });
    });
  });
});
