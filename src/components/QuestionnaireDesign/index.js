import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import CanvasSection from "./CanvasSection";
import Canvas from "./Canvas";
import SeamlessInput from "../SeamlessInput/SeamlessInput";
import SeamlessTextArea from "../SeamlessTextArea/SeamlessTextArea";
import TextAnswer from "components/Answers/TextAnswer";
import Field from "components/Forms/Field";
import Form from "components/Forms/Form";
import CustomPropTypes from "custom-prop-types";
import { noop, get } from "lodash";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AnswerTypeSelector from "components/AnswerTypeSelector";

const duration = 300;

const PageTransition = props =>
  <CSSTransition
    {...props}
    timeout={duration}
    enter
    exit={false}
    classNames="fade"
  />;

const AnimatedCanvasSection = styled(CanvasSection)`
  position: relative;
  &.fade-enter {
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
`;

class QuestionnaireDesign extends React.Component {
  static propTypes = {
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    answers: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    focused: function(props, propName, componentName) {
      const value = props[propName];

      if (value && !/(section|page|answer)/.test(value)) {
        return new Error(
          `Invalid prop '${propName}' with value \`${value}\` supplied to \`${componentName}\`.`
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
      // check for null as TransitionGroup replaces these DOM elements
      this.sectionTitle = findDOMNode(input);
    }
  };

  setPageTitle = input => {
    if (input) {
      // check for null as TransitionGroup replaces these DOM elements
      this.pageTitle = findDOMNode(input);
    }
  };

  setFocusOnTitle = () => {
    const { section, page } = this.props;

    if (get(section, "title.length") === 0) {
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
      onFocus,
      onBlur,
      focused
    } = this.props;

    return (
      <Canvas>
        <Form onChange={noop} onSubmit={noop}>
          <TransitionGroup>
            <PageTransition key={`section-${section.id}`}>
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
            </PageTransition>
            <PageTransition key={`page-${page.id}`}>
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
            </PageTransition>
            {answers.map((answer, i) => {
              return (
                <PageTransition key={answer.id}>
                  <AnimatedCanvasSection
                    id={`answer-${answer.id}`}
                    key={answer.id}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    focused={focused === `answer-${answer.id}`}
                  >
                    <TextAnswer answer={answer} onChange={onChange} index={i} />
                  </AnimatedCanvasSection>
                </PageTransition>
              );
            })}
            <PageTransition key={`add-answer`}>
              <AnimatedCanvasSection>
                <AnswerTypeSelector onSelect={onAddAnswer} />
              </AnimatedCanvasSection>
            </PageTransition>
          </TransitionGroup>
        </Form>
      </Canvas>
    );
  }
}

export default QuestionnaireDesign;
