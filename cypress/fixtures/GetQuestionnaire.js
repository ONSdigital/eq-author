export default {
  data: {
    questionnaire: {
      id: "1",
      title: "Test",
      description: "",
      surveyId: "",
      theme: "default",
      legalBasis: "StatisticsOfTradeAct",
      navigation: false,
      summary: false,
      __typename: "Questionnaire",
      sections: [
        {
          id: "1",
          title: "",
          position: 0,
          plaintextTitle: "",
          pages: [
            {
              id: "1",
              title: "",
              position: 0,
              plaintextTitle: "",
              __typename: "QuestionPage"
            }
          ],
          questionnaire: {
            questionnaireInfo: {
              totalSectionCount: 1,
              __typename: "QuestionnaireInfo"
            },
            __typename: "Questionnaire"
          },
          __typename: "Section"
        }
      ]
    }
  }
};
