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
import SectionEditor from "components/SectionEditor";
import QuestionPageEditor from "components/QuestionPageEditor";

const duration = 300;

const PageTransition = props =>
  <CSSTransition
    {...props}
    timeout={duration}
    enter
    exit={false}
    classNames="fade"
  />;

const AnimatedSection = styled.div`
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

class EditorSurface extends React.Component {
  static propTypes = {
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    onUpdatePage: PropTypes.func.isRequired,
    onUpdateSection: PropTypes.func.isRequired,
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
    // const { section, page } = this.props;
    // if (get(section, "title.length") === 0) {
    //   this.sectionTitle.focus();
    // } else if (get(page, "title.length") === 0) {
    //   this.pageTitle.focus();
    // }
  };

  handleEntered = node => {
    const inputs = node.querySelectorAll("[data-autoFocus]");
    inputs[inputs.length - 1].focus();
  };

  render() {
    const {
      section,
      page,
      onFocus,
      onBlur,
      focused,
      onUpdatePage,
      onUpdateSection
    } = this.props;

    return (
      <Canvas>
        <Form onChange={noop} onSubmit={noop}>
          <TransitionGroup>
            <PageTransition key={`section-${section.id}`}>
              <AnimatedSection>
                <CanvasSection
                  id="section"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  focused={focused === "section"}
                  key={section.id}
                >
                  <SectionEditor onUpdate={onUpdateSection} section={section} />
                </CanvasSection>
              </AnimatedSection>
            </PageTransition>
            <PageTransition key={`page-${page.id}`}>
              <AnimatedSection>
                <QuestionPageEditor onUpdatePage={onUpdatePage} page={page} />
              </AnimatedSection>
            </PageTransition>
          </TransitionGroup>
        </Form>
      </Canvas>
    );
  }
}

export default EditorSurface;
