/* eslint-disable react/no-find-dom-node */
import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import CanvasSection from "./CanvasSection";
import Canvas from "./Canvas";
import SeamlessInput from "../SeamlessInput/SeamlessInput";
import SeamlessTextArea from "../SeamlessTextArea/SeamlessTextArea";
import TextAnswer from "components/Answers/TextAnswer";
import DeleteButton from "components/DeleteButton";
import Field from "components/Forms/Field";
import Form from "components/Forms/Form";
import CustomPropTypes from "custom-prop-types";
import { noop, get } from "lodash";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AnswerTypeSelector from "components/AnswerTypeSelector";
import Answer from "components/Answer";

const duration = 300;

const FadeTransition = props =>
  <CSSTransition
    timeout={duration}
    enter
    exit={false}
    classNames="fade"
    {...props}
  />;

const AnimatedCanvasSection = styled(CanvasSection)`
  position: relative;
  &.fade-enter,
  &.fade-exit {
    opacity: 0.25;
    transform: translateX(-50px);
    z-index: 200;
  }
  &.fade-enter.fade-enter-active {
    opacity: 1;
    z-index: 200;
    transform: translateX(0);
    transition: opacity ${duration}ms ease-out,
      transform ${duration}ms cubic-bezier(0.175, 0.885, 0.320, 1.275);
  }
  &.fade-exit {
    opacity: 0;
    transition: opacity ${duration / 2}ms ease-out,
      transform ${duration / 2}ms cubic-bezier(0.175, 0.885, 0.320, 1.275);
  }
`;

const AnswerDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: .5em;
  top: .4em;
`;

class QuestionnaireDesign extends React.Component {
  static propTypes = {
    answers: PropTypes.arrayOf(CustomPropTypes.answer),
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    onChange: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onDeleteAnswer: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    focused: function(props, propName, componentName) {
      if (
        !/(section|page|answer)/.test(props[propName]) &&
        props[propName] !== null
      ) {
        return new Error(
          `Invalid prop '${propName}' of '${props[
            propName
          ]}' supplied to '${componentName}'. Validation failed.`
        );
      }
    }
  };

  componentDidMount() {
    this.setFocusOnTitle();
  }

  componentDidUpdate({ page }) {
    if (get(page, "id") !== get(this.props, "page.id")) {
      this.setFocusOnTitle();
    }
  }

  setSectionTitle = input => {
    if (input) {
      this.sectionTitle = findDOMNode(input);
    }
  };

  setPageTitle = input => {
    if (input) {
      this.pageTitle = findDOMNode(input);
    }
  };

  setFocusOnTitle = () => {
    const { section, page } = this.props;
    if (section.title.length === 0) {
      this.sectionTitle.focus();
    } else if (get(page, "title.length") === 0) {
      this.pageTitle.focus();
    }
  };

  render() {
    const {
      section,
      page,
      answers,
      onChange,
      onAddAnswer,
      onDeleteAnswer,
      onAddOption,
      onDeleteOption,
      onFocus,
      onBlur,
      focused
    } = this.props;

    return (
      <Canvas>
        <Form onChange={noop} onSubmit={noop}>
          <TransitionGroup>
            <FadeTransition key={`section-${section.id}`}>
              <AnimatedCanvasSection
                id="section"
                onFocus={onFocus}
                onBlur={onBlur}
                focused={focused === "section"}
                key={section.id}
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
              </AnimatedCanvasSection>
            </FadeTransition>
            <FadeTransition key={`page-${page.id}`} exit={false}>
              <AnimatedCanvasSection
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
              </AnimatedCanvasSection>
            </FadeTransition>

            {answers.map((answer, i) =>
              <FadeTransition key={`answer-${i}`}>
                <AnimatedCanvasSection
                  id={`answer-${answer.id}`}
                  key={answer.id}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  focused={
                    focused && focused.indexOf(`answer-${answer.id}`) > -1
                  }
                >
                  <Answer
                    answer={answer}
                    answerIndex={i}
                    onChange={onChange}
                    onAddOption={onAddOption}
                    onDeleteOption={onDeleteOption}
                    setAnswerLabel={this.setAnswerLabel}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <AnswerDeleteButton
                    onClick={function() {
                      onDeleteAnswer(answer.id);
                    }}
                    title="Delete answer"
                    type="button"
                  />
                </AnimatedCanvasSection>
              </FadeTransition>
            )}

            <FadeTransition key={`add-answer`}>
              <AnimatedCanvasSection onFocus={onFocus} onBlur={onBlur}>
                <AnswerTypeSelector onSelect={onAddAnswer} />
              </AnimatedCanvasSection>
            </FadeTransition>
          </TransitionGroup>
        </Form>
      </Canvas>
    );
  }
}

export default QuestionnaireDesign;
