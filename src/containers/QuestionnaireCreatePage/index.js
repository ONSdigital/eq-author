import { graphql } from "react-apollo";
import QuestionnaireCreatePage from "./QuestionnaireCreatePage";
import createQuestionnaireQuery from "graphql/createQuestionnaire.graphql";
import getQuestionnaireList from "graphql/getQuestionnaireList.graphql";
import { getLink } from "utils/UrlUtils";

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  createQuestionnaire: questionnaire =>
    mutate({
      variables: { input: questionnaire }
    }).then(redirectToDesigner(ownProps.history))
});

export const redirectToDesigner = history => ({ data }) => {
  const questionnaire = data.createQuestionnaire;
  const section = questionnaire.sections[0];
  const page = section.pages[0];

  history.push(getLink(questionnaire.id, section.id, page.id));
};

export const updateQuestionnaireList = (
  proxy,
  { data: { createQuestionnaire } }
) => {
  const data = proxy.readQuery({ query: getQuestionnaireList });
  data.questionnaires.push(createQuestionnaire);
  proxy.writeQuery({ query: getQuestionnaireList, data });
};

const withCreateQuestionnaire = graphql(createQuestionnaireQuery, {
  props: mapMutateToProps,
  options: {
    update: updateQuestionnaireList
  }
});

export default withCreateQuestionnaire(QuestionnaireCreatePage);
