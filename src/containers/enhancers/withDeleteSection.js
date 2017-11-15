import { graphql } from "react-apollo";
import deleteSectionMutation from "graphql/deleteSection.graphql";
import { remove, find } from "lodash";
import fragment from "graphql/questionnaireFragment.graphql";
import getNextSection from "utils/getNextOnDelete";
import { getLink } from "utils/UrlUtils";

const pluralize = (count, word, plural) => {
  if (!plural) {
    plural = word + "s";
  }
  return count === 1 ? word : plural;
};

export const handleDeletion = (ownProps, questionnaireId, deletedSectionId) => {
  const {
    questionnaire,
    history,
    onAddSection,
    sectionId: currentSectionId
  } = ownProps;

  if (questionnaire.sections.length === 1) {
    return onAddSection();
  }

  if (currentSectionId === deletedSectionId) {
    const section = getNextSection(questionnaire.sections, currentSectionId);
    const firstPage = section.pages[0];

    history.push(getLink(questionnaire.id, section.id, firstPage.id));
  }

  return Promise.resolve();
};

export const deleteUpdater = (questionnaireId, sectionId) => (
  proxy,
  result
) => {
  const id = `Questionnaire${questionnaireId}`;
  const questionnaire = proxy.readFragment({ id, fragment });

  remove(questionnaire.sections, { id: sectionId });

  proxy.writeFragment({
    id,
    fragment,
    data: questionnaire
  });
};

export const displayToast = (ownProps, questionnaireId, sectionId) => {
  const numberOfDeletedPages = find(ownProps.questionnaire.sections, {
    id: sectionId
  }).pages.length;
  ownProps.raiseToast(
    `Section${sectionId}`,
    `Section + ${numberOfDeletedPages} ${pluralize(
      numberOfDeletedPages,
      "page"
    )} deleted`,
    "undeleteSection",
    {
      questionnaireId: ownProps.questionnaireId,
      sectionId
    }
  );
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeleteSection(sectionId) {
    const section = { id: sectionId };
    const update = deleteUpdater(ownProps.questionnaireId, sectionId);

    const mutation = mutate({
      variables: { input: section },
      update
    });

    return mutation
      .then(() => handleDeletion(ownProps, ownProps.questionnaireId, sectionId))
      .then(() => displayToast(ownProps, ownProps.questionnaireId, sectionId))
      .then(() => mutation);
  }
});

export default graphql(deleteSectionMutation, {
  props: mapMutateToProps
});
