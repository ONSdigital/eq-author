// @flow
/* eslint-disable react/prop-types */

import React from "react";
import { findDOMNode } from "react-dom";
import styled from "styled-components";
import CanvasSection from "./CanvasSection";
import Canvas from "./Canvas";
import SeamlessInput from "./SeamlessInput";
import SeamlessTextArea from "./SeamlessTextArea";
import Field from "components/Forms/Field";
import Form from "components/Forms/Form";
import Button from "components/Button";

import { noop } from "lodash";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const AddAnswerButton = styled(Button)`
  color: #757575;
`;

const duration = 300;

const PageTransition = ({ children, ...props }) =>
  <CSSTransition
    {...props}
    timeout={duration}
    enter
    exit={false}
    classNames="fade"
  >
    {children}
  </CSSTransition>;

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

type PageType = {
  id: number
};

class QuestionnaireDesign extends React.Component {
  sectionTitle: HTMLInputElement;
  pageTitle: HTMLInputElement;

  componentDidMount() {
    this.setFocusOnTitle();
  }

  componentDidUpdate({ page }: { page: PageType }) {
    if (page.id !== this.props.page.id) {
      this.setFocusOnTitle();
    }
  }

  setSectionTitle = (input: HTMLInputElement) => {
    const title = findDOMNode(input);
    if (title instanceof HTMLInputElement) {
      this.sectionTitle = title;
    }
  };

  setPageTitle = (input: HTMLInputElement) => {
    const title = findDOMNode(input);
    if (title instanceof HTMLInputElement) {
      this.pageTitle = title;
    }
  };

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
            <PageTransition key={`answer-${page.id}`}>
              <AnimatedCanvasSection
                id="answers"
                onFocus={onFocus}
                onBlur={onBlur}
                focused={focused === "answers"}
                last
              >
                <AddAnswerButton type="button" clear onClick={onAnswerAdd}>
                  add an answer
                </AddAnswerButton>
              </AnimatedCanvasSection>
            </PageTransition>
          </TransitionGroup>
        </Form>
      </Canvas>
    );
  }
}

export default QuestionnaireDesign;
