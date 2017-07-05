import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PageSection from "./PageSection";
import PageCanvas from "./PageCanvas";
import SeamlessInput from "./SeamlessInput";
import SeamlessTextArea from "./SeamlessTextArea";
import Field from "components/Forms/Field";
import Form from "components/Forms/Form";
import Button from "components/Button";
import CustomPropTypes from "custom-prop-types";
import { noop } from "lodash";

const AddAnswerButton = styled(Button)`
  color: #757575;
`;

const QuestionnaireDesign = ({
  section,
  page,
  onChange,
  onAnswerAdd,
  onFocus,
  focussed
}) =>
  <PageCanvas>
    <Form onChange={noop} onSubmit={noop}>
      <PageSection
        id="section"
        onFocus={onFocus}
        focussed={focussed === "section"}
      >
        <Field id="section.title">
          <SeamlessInput
            placeholder="Section title"
            size="medium"
            autoFocus
            onChange={onChange}
            value={section.title}
          />
        </Field>
        <Field id="section.description" optional>
          <SeamlessTextArea
            cols="30"
            rows="5"
            placeholder="Enter a description (optional)…"
            onChange={onChange}
            value={section.description}
          />
        </Field>
      </PageSection>
      <PageSection id="page" onFocus={onFocus} focussed={focussed === "page"}>
        <Field id="page.title">
          <SeamlessInput
            size="large"
            placeholder="Question title"
            onChange={onChange}
            value={page.title}
          />
        </Field>
        <Field id="page.description" optional>
          <SeamlessInput
            placeholder="Question text (optional)…"
            value={page.description}
            onChange={onChange}
          />
        </Field>
        <Field id="page.guidance" optional>
          <SeamlessInput
            placeholder="Guidance text (optional)…"
            value={page.guidance}
            onChange={onChange}
          />
        </Field>
      </PageSection>
      <PageSection
        id="answers"
        onFocus={onFocus}
        focussed={focussed === "answers"}
      >
        <AddAnswerButton type="button" clear onClick={onAnswerAdd}>
          add an answer
        </AddAnswerButton>
      </PageSection>
    </Form>
  </PageCanvas>;

QuestionnaireDesign.propTypes = {
  section: CustomPropTypes.section,
  page: CustomPropTypes.page,
  onChange: PropTypes.func.isRequired,
  onAnswerAdd: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  focussed: PropTypes.oneOf(["section", "page", "answers"])
};

export default QuestionnaireDesign;
