import { graphql } from "react-apollo";
import createQuestionnaireQuery from "graphql/createQuestionnaire.graphql";
import getQuestionnaireList from "graphql/getQuestionnaireList.graphql";
import { getLink } from "utils/UrlUtils";
import { get } from "lodash";

export const redirectToDesigner = history => ({ data }) => {
  const questionnaire = data.createQuestionnaire;
  const section = questionnaire.sections[0];
  const page = section.pages[0];

  history.push(getLink(questionnaire.id, section.id, page.id));
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onCreateQuestionnaire: questionnaire => {
    const input = {
      ...questionnaire
    };

    const createdBy = get(ownProps, "user.displayName");

    if (createdBy) {
      input.createdBy = createdBy;
    }

    return mutate({
      variables: { input }
    }).then(redirectToDesigner(ownProps.history));
  }
});

export const updateQuestionnaireList = (
  proxy,
  { data: { createQuestionnaire } }
) => {
  const data = proxy.readQuery({ query: getQuestionnaireList });
  data.questionnaires.push(createQuestionnaire);
  proxy.writeQuery({ query: getQuestionnaireList, data });
};

export default graphql(createQuestionnaireQuery, {
  props: mapMutateToProps,
  options: {
    update: updateQuestionnaireList
  }
});
