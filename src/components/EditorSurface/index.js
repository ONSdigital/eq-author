/* eslint-disable react/no-find-dom-node */
import React from "react";
import PropTypes from "prop-types";

import Form from "components/Forms/Form";
import CustomPropTypes from "custom-prop-types";
import { noop } from "lodash";
import { TransitionGroup } from "react-transition-group";
import SectionEditor from "components/SectionEditor";
import QuestionPageEditor from "components/QuestionPageEditor";
import getIdForObject from "utils/getIdForObject";
import SlideTransition from "components/SlideTransition";

class EditorSurface extends React.Component {
  static propTypes = {
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    questionnaire: CustomPropTypes.questionnaire,
    onUpdatePage: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    onUpdateSection: PropTypes.func.isRequired,
    onDeleteSection: PropTypes.func.isRequired
  };

  render() {
    const {
      section,
      page,
      onUpdatePage,
      onDeletePage,
      onUpdateSection,
      onDeleteSection,
      questionnaire
    } = this.props;

    return (
      <Form onChange={noop} onSubmit={noop}>
        <TransitionGroup>
          {page ? (
            <SlideTransition key={getIdForObject(page)}>
              <QuestionPageEditor
                onUpdatePage={onUpdatePage}
                onDeletePage={onDeletePage}
                page={page}
                section={section}
                questionnaire={questionnaire}
              />
            </SlideTransition>
          ) : (
            <SlideTransition key={getIdForObject(section)}>
              <SectionEditor
                onDeleteSection={onDeleteSection}
                onUpdate={onUpdateSection}
                section={section}
              />
            </SlideTransition>
          )}
        </TransitionGroup>
      </Form>
    );
  }
}

export default EditorSurface;
