import gql from "graphql-tag";
import React from "react";
import { withApollo, Query } from "react-apollo";

import EditorLayout from "components/EditorLayout";
import Loading from "components/Loading";
import SectionEditor from "components/SectionEditor";

import SectionIntroPreview from "./SectionIntroPreview";

const UnwrappedPreviewSectionRoute = ({ data, loading }) => {
  if (loading) {
    return <Loading height="38rem">Preview loading…</Loading>;
  }

  const { section } = data;

  return (
    <EditorLayout design preview>
      <SectionIntroPreview section={section} />
    </EditorLayout>
  );
};

export const SECTION_QUERY = gql`
  query GetSection($id: ID!) {
    section(id: $id) {
      ...Section
    }
  }

  ${SectionEditor.fragments.Section}
`;

export default withApollo(props => (
  <Query query={SECTION_QUERY} variables={{ id: props.match.params.sectionId }}>
    {innerProps => <UnwrappedPreviewSectionRoute {...innerProps} {...props} />}
  </Query>
));
