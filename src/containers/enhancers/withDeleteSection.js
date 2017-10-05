import { graphql } from "react-apollo";
import deleteSectionMutation from "graphql/deleteSection.graphql";
import { remove } from "lodash";
import fragment from "graphql/questionnaireFragment.graphql";
import getNextSection from "utils/getNextOnDelete";
import { getLink } from "utils/UrlUtils";

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

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeleteSection(sectionId) {
    const section = { id: sectionId };
    const update = deleteUpdater(ownProps.questionnaireId, sectionId);

    return mutate({
      variables: { input: section },
      update
    }).then(res =>
      handleDeletion(ownProps, ownProps.questionnaireId, sectionId).then(
        () => res
      )
    );
  }
});

export default graphql(deleteSectionMutation, {
  props: mapMutateToProps
});
