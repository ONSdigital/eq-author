import createApolloClient from "apollo/createApolloClient";
import createApolloCache from "apollo/createApolloCache";
import createSchemaLink from "apollo/createSchemaLink";
import fragmentMatcher from "apollo/fragmentMatcher";
import createQuestionnaire from "graphql/createQuestionnaire.graphql";
import getQuestionnaireList from "graphql/getQuestionnaireList.graphql";
import getIdForObject from "utils/getIdForObject";

describe("MockAPI integration test", () => {
  let client;

  beforeEach(() => {
    const link = createSchemaLink();
    const cache = createApolloCache({
      addTypename: true,
      dataIdFromObject: getIdForObject,
      fragmentMatcher
    });
    client = createApolloClient(link, cache);
  });

  it("should create a questionnaire", () => {
    client.mutate({
      mutation: createQuestionnaire,
      variables: {
        input: {
          title: "Integration test questionnaire",
          description: "Created by integration test",
          theme: "default",
          legalBasis: "Voluntary",
          navigation: true,
          surveyId: "001",
          summary: true,
          createdBy: "Integration test"
        }
      }
    });

    return client
      .query({
        query: getQuestionnaireList
      })
      .then(result => {
        expect(result.data).toMatchSnapshot();
      });
  });
});
