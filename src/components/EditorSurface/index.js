/* eslint-disable react/no-find-dom-node */
import React from "react";
import PropTypes from "prop-types";
import CanvasSection from "./CanvasSection";

import Form from "components/Forms/Form";
import CustomPropTypes from "custom-prop-types";
import { noop, get } from "lodash";
import { TransitionGroup } from "react-transition-group";
import SectionEditor from "components/SectionEditor";
import QuestionPageEditor from "components/QuestionPageEditor";
import getIdForObject from "utils/getIdForObject";
import SlideTransition from "components/SlideTransition";
import getTextFromHTML from "utils/getTextFromHTML";

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
      this.sectionTitle = input;
    }
  };

  setPageTitle = input => {
    if (input) {
      this.pageTitle = input;
    }
  };

  setFocusOnTitle = () => {
    const { section, page } = this.props;
    const sectionTitle = getTextFromHTML(get(section, "title"));
    const pageTitle = getTextFromHTML(get(page, "title"));

    if (!sectionTitle) {
      this.sectionTitle.focus();
    } else if (!pageTitle) {
      this.pageTitle.focus();
    }
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

    const sectionId = getIdForObject(section);

    return (
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
          <SlideTransition key={getIdForObject(page)}>
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
    );
  }
}

export default EditorSurface;
