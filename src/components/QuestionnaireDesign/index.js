import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import CanvasSection from "./CanvasSection";
import Canvas from "./Canvas";
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

class QuestionnaireDesign extends React.Component {
  static propTypes = {
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    onChange: PropTypes.func.isRequired,
    onAnswerAdd: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    focused: PropTypes.oneOf(["section", "page", "answers", null])
  };

  componentDidMount() {
    this.setFocusOnTitle();
  }

  componentDidUpdate({ page }) {
    if (page.id !== this.props.page.id) {
      this.setFocusOnTitle();
    }
  }

  setSectionTitle = input => (this.sectionTitle = findDOMNode(input));

  setPageTitle = input => (this.pageTitle = findDOMNode(input));

  setFocusOnTitle = () => {
    const { section, page } = this.props;

    if (section.title.length === 0) {
      this.sectionTitle.focus();
    } else if (page.title.length === 0) {
      this.pageTitle.focus();
    }
  };

  render() {
    const {
      section,
      page,
      onChange,
      onAnswerAdd,
      onFocus,
      onBlur,
      focused
    } = this.props;

    return (
      <Canvas>
        <Form onChange={noop} onSubmit={noop}>
          <CanvasSection
            id="section"
            onFocus={onFocus}
            onBlur={onBlur}
            focused={focused === "section"}
          >
            <Field id="section.title">
              <SeamlessInput
                placeholder="Section title"
                size="medium"
                onChange={onChange}
                value={section.title}
                ref={this.setSectionTitle}
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
          </CanvasSection>
          <CanvasSection
            id="page"
            onFocus={onFocus}
            onBlur={onBlur}
            focused={focused === "page"}
          >
            <Field id="page.title">
              <SeamlessInput
                size="large"
                placeholder="Question title"
                onChange={onChange}
                value={page.title}
                ref={this.setPageTitle}
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
          </CanvasSection>
          <CanvasSection
            id="answers"
            onFocus={onFocus}
            onBlur={onBlur}
            focused={focused === "answers"}
          >
            <AddAnswerButton type="button" clear onClick={onAnswerAdd}>
              add an answer
            </AddAnswerButton>
          </CanvasSection>
        </Form>
      </Canvas>
    );
  }
}

export default QuestionnaireDesign;
