/* eslint-disable react/no-find-dom-node */
import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import CanvasSection from "./CanvasSection";
import Canvas from "./Canvas";
import Form from "components/Forms/Form";
import CustomPropTypes from "custom-prop-types";
import { noop, get } from "lodash";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AnswerTypeSelector from "components/AnswerTypeSelector";
import SectionEditor from "components/SectionEditor";
import PageEditor from "../PageEditor/index";
import AnswerContainer from "containers/AnswerContainer";

import Tooltip from "components/Tooltip";

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
`;

const AnswerDeleteButton = styled(DeleteButton)`
  position: absolute;
  padding: 0;
  line-height: 1;
  right: .8em;
  top: .8em;
`;


class QuestionnaireDesign extends React.Component {
  static propTypes = {
    answers: PropTypes.arrayOf(CustomPropTypes.answer),
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    onChange: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    focused: function(props, propName, componentName) {
      const value = props[propName];
      if (value && !/(section|page|answer|option)/.test(value)) {
        return new Error(
          `Invalid prop '${propName}' of '${value}' supplied to '${componentName}'. Validation failed.`
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
    if (get(section, "title.length") === 0) {
      this.sectionTitle.focus();
    } else if (get(page, "title.length") === 0) {
      this.pageTitle.focus();
    }
  };

  handleAddAnswer = type => {
    this.props.onAddAnswer(type);
  };

  handleEntered = node => {
    const inputs = node.querySelectorAll("[data-autoFocus]");
    inputs[inputs.length - 1].focus();
  };

  render() {
    const {
      section,
      page,
      answers,
      onChange,
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
                <SectionEditor
                  onChange={onChange}
                  sectionTitle={section.title}
                  sectionTitleRef={this.setSectionTitle}
                  sectionDescription={section.description}
                />
              </AnimatedCanvasSection>
            </PageTransition>
            <PageTransition key={`page-${page.id}`}>
              <AnimatedCanvasSection
                id="page"
                onFocus={onFocus}
                onBlur={onBlur}
                focused={focused === "page"}
              >
                <PageEditor
                  onChange={onChange}
                  pageTitle={page.title}
                  pageTitleRef={this.setPageTitle}
                  pageDescription={page.description}
                  pageGuidance={page.guidance}
                />
              </AnimatedCanvasSection>
            </PageTransition>

            {answers.map((answer, answerIndex) =>
              <PageTransition
                key={`page-${page.id}-answer-${answer.id}`}
                onEntered={this.handleEntered}
              >
                <AnimatedCanvasSection
                  id={`answer-${answer.id}`}
                  key={answer.id}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  focused={
                    focused && focused.indexOf(`answer-${answer.id}`) > -1
                  }
                >
                  <AnswerContainer
                    // answerId={answer.id}
                    answer={answer}
                    answerIndex={answerIndex}
                    pageId={page.id}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onEntered={this.handleEntered}
                  />
                  <Tooltip content="Delete answer">
                    <AnswerDeleteButton
                      onClick={function() {
                        onDeleteAnswer(answer.id);
                      }}
                      type="button"
                    />
                  </Tooltip>
                </AnimatedCanvasSection>
              </PageTransition>
            )}

            <PageTransition key={`add-answer-${page.id}`}>
              <AnimatedCanvasSection onFocus={onFocus} onBlur={onBlur}>
                <AnswerTypeSelector onSelect={this.handleAddAnswer} />
              </AnimatedCanvasSection>
            </PageTransition>
          </TransitionGroup>
        </Form>
      </Canvas>
    );
  }
}

export default QuestionnaireDesign;
