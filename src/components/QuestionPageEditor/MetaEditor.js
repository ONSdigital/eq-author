import React from "react";
import Field from "components/Forms/Field";
import RichTextEditor from "components/RichTextEditor";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import withEntityEditor from "components/withEntityEditor";
import pageFragment from "graphql/fragments/page.graphql";
import styled from "styled-components";
import { compose, withApollo } from "react-apollo";
import { flip, partial } from "lodash";
import getAnswersQuery from "graphql/getAnswers.graphql";

const titleControls = {
  emphasis: true,
  piping: true
};
const descriptionControls = {
  bold: true,
  emphasis: true,
  piping: true
};
const guidanceControls = {
  heading: true,
  bold: true,
  list: true,
  piping: true
};

const GuidanceRichTextEditor = styled(RichTextEditor)`
  background-color: #f9f9f9;
  border-left: 4px solid #dcdcdc;
  padding: 1em;
`;

export class StatelessMetaEditor extends React.Component {
  render() {
    const { page, onChange, onUpdate, client } = this.props;
    const handleUpdate = partial(flip(onChange), onUpdate);

    const fetchAnswers = ids => {
      return client
        .query({
          query: getAnswersQuery,
          variables: { ids }
        })
        .then(result => result.data.answers);
    };

    return (
      <div>
        <Field id="title">
          <RichTextEditor
            placeholder="Question title"
            value={page.title}
            ref={this.props.titleRef}
            onUpdate={handleUpdate}
            label="title"
            controls={titleControls}
            size="large"
            fetchAnswers={fetchAnswers}
          />
        </Field>
        <Field id="description">
          <RichTextEditor
            placeholder="Question text (optional)…"
            value={page.description}
            onUpdate={handleUpdate}
            label="guidance"
            controls={descriptionControls}
            multiline
            fetchAnswers={fetchAnswers}
          />
        </Field>
        <Field id="guidance">
          <GuidanceRichTextEditor
            placeholder="Guidance text (optional)…"
            value={page.guidance}
            onUpdate={handleUpdate}
            label="guidance"
            controls={guidanceControls}
            multiline
            fetchAnswers={fetchAnswers}
          />
        </Field>
      </div>
    );
  }
}

StatelessMetaEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  page: CustomPropTypes.page,
  titleRef: PropTypes.func,
  client: CustomPropTypes.apolloClient.isRequired
};

export default compose(withApollo, withEntityEditor("page", pageFragment))(
  StatelessMetaEditor
);
