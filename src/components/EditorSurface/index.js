/* eslint-disable react/no-find-dom-node */
import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import CanvasSection from "./CanvasSection";
import Canvas from "./Canvas";
import Form from "components/Forms/Form";
import CustomPropTypes from "custom-prop-types";
import { noop, get } from "lodash";
import { TransitionGroup } from "react-transition-group";
import SectionEditor from "components/SectionEditor";
import QuestionPageEditor from "components/QuestionPageEditor";
import getIdFromObject from "utils/getIdFromObject";
import SlideTransition from "components/SlideTransition";

class EditorSurface extends React.Component {
  static propTypes = {
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    onUpdatePage: PropTypes.func.isRequired,
    onUpdateSection: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    focused: PropTypes.string.isRequired
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

  handleEntered = node => {
    const inputs = node.querySelectorAll("[data-autoFocus]");
    inputs[inputs.length - 1].focus();
  };

  render() {
    const {
      section,
      page,
      onFocus,
      focused,
      onUpdatePage,
      onUpdateSection
    } = this.props;

    const sectionId = getIdFromObject(section);

    return (
      <Canvas>
        <Form onChange={noop} onSubmit={noop}>
          <TransitionGroup>
            <SlideTransition key={sectionId}>
              <CanvasSection
                id={sectionId}
                onFocus={onFocus}
                isFocused={focused === sectionId}
              >
                <SectionEditor
                  onUpdate={onUpdateSection}
                  section={section}
                  titleRef={this.setSectionTitle}
                />
              </CanvasSection>
            </SlideTransition>
            <SlideTransition key={getIdFromObject(page)}>
              <QuestionPageEditor
                onUpdatePage={onUpdatePage}
                page={page}
                onFocus={onFocus}
                focused={focused}
                titleRef={this.setPageTitle}
              />
            </SlideTransition>
          </TransitionGroup>
        </Form>
      </Canvas>
    );
  }
}

export default EditorSurface;
