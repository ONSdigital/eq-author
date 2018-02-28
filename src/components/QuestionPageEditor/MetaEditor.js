import React from "react";
import Field from "components/Forms/Field";
import RichTextEditor from "components/RichTextEditor";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import withEntityEditor from "components/withEntityEditor";
import pageFragment from "graphql/fragments/page.graphql";
import styled from "styled-components";
import { withApollo } from "react-apollo";
import { flip, partial, flowRight } from "lodash";
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
            placeholder="Question"
            value={page.title}
            ref={this.props.titleRef}
            onUpdate={handleUpdate}
            label="Question"
            controls={titleControls}
            size="large"
            fetchAnswers={fetchAnswers}
            testSelector="txt-question-title"
          />
        </Field>
        <Field id="description">
          <RichTextEditor
            placeholder="Question guidance (optional)…"
            value={page.description}
            onUpdate={handleUpdate}
            label="Question guidance"
            controls={descriptionControls}
            multiline
            fetchAnswers={fetchAnswers}
            testSelector="txt-question-description"
          />
        </Field>
        <Field id="guidance">
          <GuidanceRichTextEditor
            placeholder="Include / exclude guidance (optional)…"
            value={page.guidance}
            onUpdate={handleUpdate}
            label="Include/exclude guidance"
            controls={guidanceControls}
            multiline
            fetchAnswers={fetchAnswers}
            testSelector="txt-question-guidance"
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

export default flowRight(withApollo, withEntityEditor("page", pageFragment))(
  StatelessMetaEditor
);
